package helper

import (
	"path/filepath"
	"strings"

	"github.com/go-playground/validator/v10"
)

type Response struct {
	Meta Meta        `json:"meta"`
	Data interface{} `json:"data"`
}

type Meta struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
	Status  string `json:"status"`
}

func APIResponse(message string, code int, status string, data interface{}) Response {
	meta := Meta{
		Message: message,
		Code:    code,
		Status:  status,
	}

	jsonResponse := Response{
		Meta: meta,
		Data: data,
	}

	return jsonResponse
}

func FormatValidationError(err error) []string {
	var errors []string
	for _, e := range err.(validator.ValidationErrors) {
		errors = append(errors, e.Error())
	}
	return errors
}

func ContainsAnyWord(inputString string, words []string) bool {
	for _, word := range words {
		if strings.Contains(inputString, word) {
			return true
		}
	}
	return false
}

func CleanUrlPath(url string) string {
	// Extract the file name from the URL
	fileName := filepath.Base(url)

	// Remove invalid characters from the file name
	fileName = strings.ReplaceAll(fileName, "\\", "")
	fileName = strings.ReplaceAll(fileName, "/", "")
	// Add more replacements as needed

	return fileName
}
