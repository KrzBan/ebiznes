# Ubuntu + python
FROM ubuntu:22.04

RUN apt-get update && apt-get upgrade

RUN apt-get install ca-certificates apt-transport-https software-properties-common lsb-release -y
RUN gpg --list-keys
RUN gpg --no-default-keyring --keyring /usr/share/keyrings/deadsnakes.gpg --keyserver keyserver.ubuntu.com --recv-keys F23C5A6CF475977595C89F51BA6932366A755776
RUN echo "deb [signed-by=/usr/share/keyrings/deadsnakes.gpg] https://ppa.launchpadcontent.net/deadsnakes/ppa/ubuntu $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/python.list
RUN apt-get update

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get install -y python3.8

# Java8 + Kotlin + Gradle
RUN apt-get install -y openjdk-8-jdk

RUN apt-get install -y curl zip unzip
RUN curl -s "https://get.sdkman.io" | bash
RUN chmod a+x "$HOME/.sdkman/bin/sdkman-init.sh"

SHELL ["/bin/bash", "-c"] 
RUN source "$HOME/.sdkman/bin/sdkman-init.sh" && sdk install kotlin && sdk install gradle

# Hello World, JDBC SQLite and run with CMD
WORKDIR "/root"

RUN source "$HOME/.sdkman/bin/sdkman-init.sh" && gradle init --type java-application && gradle build
RUN sed -i "s/dependencies {/dependencies {\n    implementation 'org.xerial:sqlite-jdbc:3.7.2'/" ./app/build.gradle

CMD source "$HOME/.sdkman/bin/sdkman-init.sh" && gradle run
