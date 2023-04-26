package controllers

import models._

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import scala.collection.mutable

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

    private val categoryList = new mutable.ListBuffer[CategoryItem]()
    categoryList += CategoryItem(0, "TestCategory")
    categoryList += CategoryItem(1, "AnotherTestCategory")

    implicit val categoryListJson = Json.format[CategoryItem]
    implicit val newCategoryListJson = Json.format[NewCategoryItem]

    def getAll(): Action[AnyContent] = Action {
        Ok(Json.toJson(categoryList))
    }

    def getById(itemId: Long) = Action {
        val foundItem = categoryList.find(_.id == itemId)
        foundItem match {
            case Some(item) => Ok(Json.toJson(item))
            case None => NotFound
        }
    }

    def update(itemId: Long) = Action {
        val foundItem = categoryList.find(_.id == itemId)
        foundItem match {
            case Some(item) => 
                val newItem = item.copy(description = "Updated: " + item.description)
                categoryList.dropWhileInPlace(_.id == itemId)
                categoryList += newItem
                Accepted(Json.toJson(newItem))
            case None => NotFound
        }
    }

    def delete(itemId: Long) = Action {
        categoryList.dropWhileInPlace(_.id == itemId)
        Accepted
    }

    def add() = Action { implicit request => 
        val content = request.body
        val jsonObject = content.asJson
        val categoryListItem: Option[NewCategoryItem] =
            jsonObject.flatMap(
                Json.fromJson[NewCategoryItem](_).asOpt
            )

        categoryListItem match {
            case Some(newItem) =>
                val nextId = categoryList.map(_.id).max + 1
                val toBeAdded = CategoryItem(nextId, newItem.description)
                categoryList += toBeAdded
                Created(Json.toJson(toBeAdded))
            case None =>
                BadRequest
        }
    }

}
