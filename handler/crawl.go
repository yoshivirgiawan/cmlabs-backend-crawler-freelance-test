package handler

import (
	"cmlabs-backend-crawler-freelance-test/forms"
	"cmlabs-backend-crawler-freelance-test/helper"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/gocolly/colly/v2"
)

type crawlHandler struct {
}

func NewCrawlHandler() *crawlHandler {
	return &crawlHandler{}
}

func (h *crawlHandler) Crawl(c *gin.Context) {
	var crawlForm forms.CrawlForm

	err := c.ShouldBindJSON(&crawlForm)
	if err != nil {
		errors := helper.FormatValidationError(err)
		errorMessage := gin.H{"errors": errors}

		response := helper.APIResponse("Failed to crawl website", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	cCollector := colly.NewCollector()

	u, _ := url.Parse(crawlForm.Url)
	saveFolderPath := "crawled_website/" + u.Host

	// Create the folder if it doesn't exist
	err = os.MkdirAll(saveFolderPath, os.ModePerm)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	htmlFilePath := filepath.Join(saveFolderPath, "index.html")
	var cssContent, jsContent, imgContent string

	// Set up the callback for handling crawled data
	cCollector.OnHTML("html", func(e *colly.HTMLElement) {
		// Save the HTML content to a file
		err := e.Response.Save(htmlFilePath)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to save HTML content"})
			return
		}
	})

	// Set up the callback for handling CSS content
	cCollector.OnHTML("link[href]", func(e *colly.HTMLElement) {
		if e.Attr("rel") == "stylesheet" || e.Attr("rel") == "icon" || e.Attr("rel") == "apple-touch-icon" || e.Attr("rel") == "shortcut icon" || strings.Contains(e.Attr("href"), "image") {
			cssURL := e.Attr("href")
			_, err := url.ParseRequestURI(cssURL)
			if err != nil || string(cssURL[0]) == "/" {
				assetCssURL := crawlForm.Url + "/" + cssURL
				cssContent = downloadContent(assetCssURL)

				fontURLs := extractFontURLs(cssContent)

				cssPath := filepath.Join(saveFolderPath, cssURL)
				parsedCssURL, _ := url.Parse(cssPath)

				dir := filepath.Dir(cssPath)
				if err := os.MkdirAll(dir, 0755); err != nil {
					fmt.Println("Error creating directory:", err)
					return
				}
				saveContentToFile(cssContent, path.Base(parsedCssURL.Path))

				for _, fontURL := range fontURLs {
					if !helper.ContainsAnyWord(fontURL, []string{"https", "http", "www", "data:"}) {
						cleanAssetFontPath := filepath.Clean(filepath.Dir(cssURL) + "/" + strings.Replace(fontURL, "\"", "", -1))
						assetFontURL := crawlForm.Url + "/" + strings.Replace(cleanAssetFontPath, "\\", "/", -1)
						fontPath := filepath.Join(filepath.Dir(cssPath), strings.Replace(fontURL, "\"", "", -1))
						parsedFontURL, _ := url.Parse(fontPath)
						dir := filepath.Dir(fontPath)
						if err := os.MkdirAll(dir, 0755); err != nil {
							fmt.Println("Error creating directory:", err)
							return
						}
						saveFileFromHttpGet(assetFontURL, path.Base(parsedFontURL.Path))
					}
				}
			}
		}
	})

	cCollector.OnHTML("img[src]", func(e *colly.HTMLElement) {
		imgURL := e.Attr("src")
		_, err := url.ParseRequestURI(imgURL)
		if err != nil {
			assetImgURL := crawlForm.Url + "/" + imgURL
			imgContent = downloadContent(assetImgURL)
			imgPath := filepath.Join(saveFolderPath, imgURL)
			parsedImgURL, _ := url.Parse(imgPath)
			dir := filepath.Dir(imgPath)
			if err := os.MkdirAll(dir, 0755); err != nil {
				fmt.Println("Error creating directory:", err)
				return
			}
			saveContentToFile(imgContent, path.Base(parsedImgURL.Path))
		}
	})

	// Set up the callback for handling JavaScript content
	cCollector.OnHTML("script[src]", func(e *colly.HTMLElement) {
		jsURL := e.Attr("src")
		_, err := url.ParseRequestURI(jsURL)
		if err != nil || string(jsURL[0]) == "/" {
			assetjsURL := crawlForm.Url + "/" + jsURL
			jsContent = downloadContent(assetjsURL)
			fmt.Println("JS URL: ", jsURL)
			imageURLs := extractImageURLFromJS(jsContent)
			fmt.Println("Image URL: ", imageURLs)
			jsPath := filepath.Join(saveFolderPath, jsURL)
			parsedJsURL, _ := url.Parse(jsPath)
			dir := filepath.Dir(jsPath)
			if err := os.MkdirAll(dir, 0755); err != nil {
				fmt.Println("Error creating directory:", err)
				return
			}
			saveContentToFile(jsContent, path.Base(parsedJsURL.Path))

			for _, imageURL := range imageURLs {
				if !helper.ContainsAnyWord(imageURL, []string{"https", "http", "www", "data:"}) {
					var assetImageURL string
					if strings.Contains(imageURL, "/_next") {
						assetImageURL = crawlForm.Url + "/_next/image?url=" + imageURL + "&w=3840&q=75"
					} else {
						assetImageURL = crawlForm.Url + "/" + imageURL
					}
					fmt.Println("Image URL: ", assetImageURL)
					imageContent := downloadContent(assetImageURL)
					imagePath := filepath.Join(saveFolderPath, strings.Replace(imageURL, "\"", "", -1))
					parsedImageURL, _ := url.Parse(imagePath)
					dir := filepath.Dir(imagePath)
					if err := os.MkdirAll(dir, 0755); err != nil {
						fmt.Println("Error creating directory:", err)
						return
					}
					saveContentToFile(imageContent, path.Base(parsedImageURL.Path))
				}
			}
		}
	})

	// Start crawling
	err = cCollector.Visit(crawlForm.Url)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to crawl the website"})
		return
	}

	response := helper.APIResponse("Successfuly crawling", http.StatusOK, "success", nil)

	c.JSON(http.StatusOK, response)
}

func saveFileFromHttpGet(url string, filePath string) {
	out, err := os.Create(filePath)
	if err != nil {
		return
	}
	defer out.Close()

	// Perform the HTTP request to get the file
	response, err := http.Get(url)
	if err != nil {
		return
	}
	defer response.Body.Close()

	// Copy the content from the HTTP response to the file
	_, err = io.Copy(out, response.Body)
	if err != nil {
		return
	}
}

func extractFontURLs(cssContent string) []string {
	var fontURLs []string

	pattern := `url\(([^)]+)\)`

	// Mencocokkan pola regex dengan teks
	re := regexp.MustCompile(pattern)
	matches := re.FindAllStringSubmatch(cssContent, -1)

	// Menampilkan hasil
	for _, match := range matches {
		fontURLs = append(fontURLs, match[1])
	}

	return fontURLs
}

// downloadContent downloads the content of a given URL
func downloadContent(url string) string {
	c := colly.NewCollector()
	var content string

	c.OnResponse(func(r *colly.Response) {
		content = string(r.Body)
	})

	err := c.Visit(url)
	if err != nil {
		return ""
	}

	return content
}

func extractImageURLFromJS(jsCode string) []string {
	var imageURLs []string

	pattern := `src:"([^"]+)"`

	// Mencocokkan pola regex dengan teks
	re := regexp.MustCompile(pattern)
	matches := re.FindAllStringSubmatch(jsCode, -1)

	// Menampilkan hasil
	for _, match := range matches {
		imageURLs = append(imageURLs, match[1])
	}

	return imageURLs
}

// saveContentToFile saves content to a file
func saveContentToFile(content, filePath string) {
	err := ioutil.WriteFile(filePath, []byte(content), 0644)
	if err != nil {
		fmt.Printf("Failed to save content to file %s: %v\n", filePath, err)
	}
}
