# Build stage
FROM gradle:8.12-jdk17-alpine AS build
WORKDIR /app
COPY --chown=gradle:gradle . .
RUN ./gradlew clean bootJar --no-daemon

# Run stage
FROM eclipse-temurin:17-jre-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
