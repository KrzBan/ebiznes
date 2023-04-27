package controllers

import (
	"github.com/labstack/echo/v4"
	"myapp/database"
	. "myapp/models"
	"net/http"
	"strconv"
	"sync"
)

var (
	lock = sync.Mutex{}
	db   = database.CreateDB()
)

func CreateProduct(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()

	product := Product{}
	if err := c.Bind(product); err != nil {
		return err
	}

	db.Create(&product)

	return c.JSON(http.StatusOK, product)
}

func GetProduct(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()

	id, _ := strconv.Atoi(c.Param("id"))
	var product Product
	db.First(&product, id)

	return c.JSON(http.StatusOK, product)
}

func GetProducts(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()

	var products []Product
	_ = db.Find(&products)

	return c.JSON(http.StatusOK, products)
}

func UpdateProduct(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()

	newProduct := Product{}
	if err := c.Bind(newProduct); err != nil {
		return err
	}

	id, _ := strconv.Atoi(c.Param("id"))
	var product Product
	db.First(&product, id)
	db.Model(&product).Updates(newProduct)

	return c.JSON(http.StatusOK, product)
}

func DeleteProduct(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()

	id, _ := strconv.Atoi(c.Param("id"))
	var product Product
	db.Delete(&product, id)

	return c.JSON(http.StatusOK, product)
}
