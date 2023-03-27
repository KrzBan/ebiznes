package controllers

import models._

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import scala.collection.mutable

@Singleton
class CartController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

    private val cartList = new mutable.ListBuffer[CartItem]()
    cartList += CartItem(0, "TestCart")
    cartList += CartItem(1, "AnotherTestCast")

    implicit val cartListJson = Json.format[CartItem]
    implicit val newCartListJson = Json.format[NewCartItem]

    def getAll(): Action[AnyContent] = Action {
        Ok(Json.toJson(cartList))
    }

    def getById(itemId: Long) = Action {
        val foundItem = cartList.find(_.id == itemId)
        foundItem match {
            case Some(item) => Ok(Json.toJson(item))
            case None => NotFound
        }
    }

    def update(itemId: Long) = Action {
        val foundItem = cartList.find(_.id == itemId)
        foundItem match {
            case Some(item) => 
                val newItem = item.copy(description = "Updated: " + item.description)
                cartList.dropWhileInPlace(_.id == itemId)
                cartList += newItem
                Accepted(Json.toJson(newItem))
            case None => NotFound
        }
    }

    def delete(itemId: Long) = Action {
        cartList.dropWhileInPlace(_.id == itemId)
        Accepted
    }

    def add() = Action { implicit request => 
        val content = request.body
        val jsonObject = content.asJson
        val cartListItem: Option[NewCartItem] =
            jsonObject.flatMap(
                Json.fromJson[NewCartItem](_).asOpt
            )

        cartListItem match {
            case Some(newItem) =>
                val nextId = cartList.map(_.id).max + 1
                val toBeAdded = CartItem(nextId, newItem.description)
                cartList += toBeAdded
                Created(Json.toJson(toBeAdded))
            case None =>
                BadRequest
        }
    }

}
