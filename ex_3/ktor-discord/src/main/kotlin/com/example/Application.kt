package com.example

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.example.plugins.*
import dev.kord.core.*
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent

suspend fun main() {
    val token = System.getenv("token")
    println(token)
    val kord = Kord(token)

    kord.on<MessageCreateEvent> { // runs every time a message is created that our bot can read

        // ignore other bots, even ourselves. We only serve humans here!
        if (message.author?.isBot != false) return@on

        // check if our command is being invoked
        if (message.content != "!ping") return@on

        // all clear, give them the pong!
        message.channel.createMessage("pong!")
    }

    kord.login {
        // we need to specify this to receive the content of messages
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
    }

    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
            .start(wait = true)
}

fun Application.module() {
    configureSerialization()
    configureSockets()
    configureRouting()
}
