package controllers

import models._

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import scala.collection.mutable

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

    private val productList = new mutable.ListBuffer[ProductItem]()
    productList += ProductItem(0, "TestProduct")
    productList += ProductItem(1, "AnotherTestProduct")

    implicit val productListJson = Json.format[ProductItem]
    implicit val newProductListJson = Json.format[NewProductItem]

    def getAll(): Action[AnyContent] = Action {
        Ok(Json.toJson(productList))
    }

    def getById(itemId: Long) = Action {
        val foundItem = productList.find(_.id == itemId)
        foundItem match {
            case Some(item) => Ok(Json.toJson(item))
            case None => NotFound
        }
    }

    def update(itemId: Long) = Action {
        val foundItem = productList.find(_.id == itemId)
        foundItem match {
            case Some(item) => 
                val newItem = item.copy(description = "Updated: " + item.description)
                productList.dropWhileInPlace(_.id == itemId)
                productList += newItem
                Accepted(Json.toJson(newItem))
            case None => NotFound
        }
    }

    def delete(itemId: Long) = Action {
        productList.dropWhileInPlace(_.id == itemId)
        Accepted
    }

    def add() = Action { implicit request => 
        val content = request.body
        val jsonObject = content.asJson
        val productListItem: Option[NewProductItem] =
            jsonObject.flatMap(
                Json.fromJson[NewProductItem](_).asOpt
            )

        productListItem match {
            case Some(newItem) =>
                val nextId = productList.map(_.id).max + 1
                val toBeAdded = ProductItem(nextId, newItem.description)
                productList += toBeAdded
                Created(Json.toJson(toBeAdded))
            case None =>
                BadRequest
        }
    }

}
