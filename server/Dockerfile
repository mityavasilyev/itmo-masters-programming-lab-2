FROM maven:3-amazoncorretto-17 as build
WORKDIR /server
ADD ./ ./
RUN mvn clean package -DskipTests

FROM openjdk:17-ea-jdk-oracle
COPY --from=build server/target/*.jar service.jar
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /service.jar"]