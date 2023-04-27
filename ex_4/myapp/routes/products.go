package routes

import (
	"github.com/labstack/echo/v4"
	"myapp/controllers"
)

func InitProductsRoutes(e *echo.Echo) {
	e.GET("/products", controllers.GetProducts)
	e.GET("/products/:id", controllers.GetProduct)

	e.POST("/products", controllers.CreateProduct)
	e.PUT("/products/:id", controllers.UpdateProduct)
	e.DELETE("/products/:id", controllers.DeleteProduct)
}
