plugins {
    id("org.springframework.boot") version "3.5.11"
    id("io.spring.dependency-management") version "1.1.6"
    java
}

group =
    "com.gestion.escuela"
version =
    "1.0.0"

java {
    toolchain {
        languageVersion.set(
            JavaLanguageVersion.of(
                21
            )
        )
    }
}

repositories {
    mavenCentral()
}

dependencies {

    implementation(
        "org.springframework.boot:spring-boot-starter-web"
    )
    implementation(
        "org.springframework.boot:spring-boot-starter-data-jpa"
    )
    implementation(
        "org.springframework.boot:spring-boot-starter-validation"
    )
    implementation(
        "org.springframework.boot:spring-boot-starter-actuator"
    )
    implementation(
        "org.springframework.boot:spring-boot-starter-security"
    )

    implementation(
        "org.springdoc:springdoc-openapi-starter-webmvc-ui:2.5.0"
    )

    runtimeOnly(
        "org.postgresql:postgresql"
    )

    implementation(
        "org.flywaydb:flyway-core:10.22.0"
    )
    implementation(
        "org.flywaydb:flyway-database-postgresql:10.22.0"
    )

    implementation(
        "com.fasterxml.jackson.datatype:jackson-datatype-jsr310"
    )

    compileOnly(
        "org.projectlombok:lombok:1.18.38"
    )
    annotationProcessor(
        "org.projectlombok:lombok:1.18.38"
    )

    testImplementation(
        "org.springframework.boot:spring-boot-starter-test"
    )
    testImplementation(
        "org.testcontainers:postgresql"
    )
    testImplementation(
        "org.testcontainers:junit-jupiter"
    )
    testImplementation(
        "io.rest-assured:rest-assured"
    )
}

tasks.test {
    useJUnitPlatform {
        if (project.hasProperty(
                "includeIntegration"
            )
        ) {
            includeTags(
                "integration"
            )
        } else {
            excludeTags(
                "integration"
            )
        }
    }
}

tasks.bootJar {
    enabled =
        true
    archiveFileName.set(
        "app.jar"
    )
}

tasks.jar {
    enabled =
        false
}