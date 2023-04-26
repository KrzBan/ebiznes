package models

case class ProductItem(id: Long, description: String)
case class NewProductItem(description: String)

case class CartItem(id: Long, description: String)
case class NewCartItem(description: String)

case class CategoryItem(id: Long, description: String)
case class NewCategoryItem(description: String)