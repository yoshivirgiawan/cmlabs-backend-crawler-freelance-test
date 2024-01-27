package main

import (
	"cmlabs-backend-crawler-freelance-test/handler"

	"github.com/gin-gonic/gin"
)

func main() {
	crawlHandler := handler.NewCrawlHandler()
	router := gin.Default()
	api := router.Group("/api")

	api.POST("/crawl", crawlHandler.Crawl)

	router.Run()
}
