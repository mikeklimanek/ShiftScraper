package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"github.com/antchfx/htmlquery"
)

func main() {
	resp, err := http.Get("https://my-rsms.com/calendar")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(body))

	// Parse the HTML document
	doc, err := htmlquery.Parse(strings.NewReader(string(body)))
	if err != nil {
		panic(err)
	}

	// Create a new file
	file, err := os.Create("output.md")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	// Use the XPath expression to select the h6 elements
	nodes, err := htmlquery.QueryAll(doc, `//h6`)
	if err != nil {
		panic(err)
	}

	// Write the inner text of each selected element to the file
	for _, node := range nodes {
		_, err := file.WriteString(htmlquery.InnerText(node) + "\n")
		if err != nil {
			panic(err)
		}
	}
}
