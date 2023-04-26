FROM eclipse/kotlin:latest

RUN /bin/sh -c curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && sudo apt update && sudo apt install ngrok

VOLUME [/home/student/ebiz/]
USER student
WORKDIR /home/student/
RUN /bin/sh -c mkdir ebiz
WORKDIR /home/student/ebiz