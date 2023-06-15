package com.example

import com.aallam.openai.api.BetaOpenAI
import com.aallam.openai.api.chat.ChatCompletion
import com.aallam.openai.api.chat.ChatCompletionRequest
import com.aallam.openai.api.chat.ChatMessage
import com.aallam.openai.api.chat.ChatRole
import com.aallam.openai.api.model.ModelId
import com.aallam.openai.client.OpenAI
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import com.example.plugins.*
import com.example.openai
import dev.kord.core.*
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent

suspend fun main() {
    val tokenDiscord = System.getenv("bot")
    val kord = Kord(tokenDiscord)

    val tokenOpenai = System.getenv("openai")
    val openai = OpenAI(
        token = tokenOpenai
    )

    embeddedServer(Netty, port = 8888, host = "0.0.0.0"){
        openai(openai)
    }.start(wait = false)

    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
    .start(wait = false)

    kord.on<MessageCreateEvent> {
        if (message.author?.isBot != false) return@on

        if (message.content != "!ping") return@on

        message.channel.createMessage("pong!")
    }

    kord.login {
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
    }
}

fun Application.module() {
    configureSerialization()
    configureSockets()
    configureRouting()
}

@OptIn(BetaOpenAI::class)
fun Application.openai(openai: OpenAI) {
    routing {
        get("/openai") {            
            val request = ChatCompletionRequest(
                model = ModelId("text-ada-001"),
                messages = listOf(
                    ChatMessage(
                        role = ChatRole.System,
                        content = "Prompt me"
                    ),
                    ChatMessage(
                        role = ChatRole.User,
                        content = "How do I integrate chatGPT into a Kotlin application?"
                    )
                )
            )

            val completion: ChatCompletion = openai.chatCompletion(request)

            completion.choices.first().message
                ?.let { 
                    msg -> call.respond(msg.content) 
                }
        }
    }
}
