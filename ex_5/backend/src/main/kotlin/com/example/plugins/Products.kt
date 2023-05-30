package com.example.plugins

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

class Product(var name: String, var price: Double)

fun Application.configureProducts() {
    install(CORS) {
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Post)
        allowMethod(HttpMethod.Get)
        allowHeader(HttpHeaders.AccessControlAllowOrigin)
        allowHeader(HttpHeaders.ContentType)
        anyHost()
    }

    val products = listOf(
        Product("Product #1", 10.0),
        Product("Product #2", 12.0),
        Product("Product #3", 20.0),
        Product("Product #4", 50.0),
    )
    routing {
        get("/products") {
            call.respond(products)
        }
    }
}
