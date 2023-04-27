package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	. "myapp/models"
)

func CreateDB() (db *gorm.DB) {
	db, err := gorm.Open(sqlite.Open("test.database"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	err = db.AutoMigrate(&Product{})
	if err != nil {
		return
	}

	// Create
	db.Create(&Product{Name: "Product", Price: 100})

	// Read
	var product Product
	db.First(&product, 1) // find product with integer primary key
	db.First(&product, "Name = ?", "Product")

	// Update - update product's price to 200
	db.Model(&product).Update("Price", 200)
	// Update - update multiple fields
	db.Model(&product).Updates(Product{Price: 200, Name: "Cool Product"}) // non-zero fields
	db.Model(&product).Updates(map[string]interface{}{"Price": 200, "Name": "Cool Product"})

	return db
}
