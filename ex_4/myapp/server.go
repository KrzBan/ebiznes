package main

import (
	"github.com/labstack/echo/v4"
	"net/http"

	"myapp/routes"
)

func main() {
	e := echo.New()
	routes.InitProductsRoutes(e)

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start(":1323"))
}
