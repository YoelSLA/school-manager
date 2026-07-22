plugins {
    id("org.springframework.boot") version "3.5.11"
    id("io.spring.dependency-management") version "1.1.6"
    id("com.diffplug.spotless") version "7.2.1"

    java
}

group = "com.gestion.escuela"
version = "1.0.0"

java {
    toolchain {
        languageVersion.set(
            JavaLanguageVersion.of(21)
        )
    }
}

repositories {
    mavenCentral()
}

dependencies {

    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.5.0")
    implementation("org.flywaydb:flyway-core")
    implementation("org.flywaydb:flyway-database-postgresql")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310")

    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    runtimeOnly("org.postgresql:postgresql")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
    testImplementation("org.testcontainers:postgresql")
    testImplementation("org.testcontainers:junit-jupiter")
    testImplementation("io.rest-assured:rest-assured")
}

tasks.test {
    useJUnitPlatform {
        if (project.hasProperty("includeIntegration")) {
            includeTags("integration")
        } else {
            excludeTags("integration")
        }
    }
}

tasks.bootJar {
    enabled = true
    archiveFileName.set("app.jar")
}

tasks.jar {
    enabled = false
}

spotless {
    java {
        target("src/**/*.java")

        googleJavaFormat()

        removeUnusedImports()

        importOrder()

        trimTrailingWhitespace()

        endWithNewline()
    }

    format("misc") {
        target(
            "*.md",
            "*.yml",
            "*.yaml",
            ".gitignore",
            "*.gradle.kts"
        )

        trimTrailingWhitespace()

        endWithNewline()
    }
}
