package forms

type CrawlForm struct {
	Url string `json:"url" binding:"required,url"`
}
