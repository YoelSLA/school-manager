package com.gestion.escuela.gestion_escolar.rest;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.TimeZone;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasItem;

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class MateriaRestAssuredTest {

	@Container
	static PostgreSQLContainer<?> postgres =
			new PostgreSQLContainer<>("postgres:16-alpine")
					.withDatabaseName("testdb")
					.withUsername("test")
					.withPassword("test")
					.withEnv("TZ", "UTC")
					.withCommand("postgres", "-c", "timezone=UTC");
	@LocalServerPort
	int port;

	@DynamicPropertySource
	static void configureProperties(DynamicPropertyRegistry registry) {
		registry.add("spring.datasource.url", postgres::getJdbcUrl);
		registry.add("spring.datasource.username", postgres::getUsername);
		registry.add("spring.datasource.password", postgres::getPassword);
		registry.add("spring.datasource.driver-class-name", postgres::getDriverClassName);

		registry.add("spring.jpa.properties.hibernate.jdbc.time_zone", () -> "UTC");
		registry.add("spring.datasource.hikari.data-source-properties.TimeZone", () -> "UTC");
	}

	@BeforeAll
	static void forceUtc() {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

	@BeforeEach
	void setup() {
		RestAssured.port = port;
		RestAssured.baseURI = "http://localhost";
	}

	// 🔥 TEST REAL E2E

	@Test
	void flujoCompletoMateria() {

		long escuelaId =
				given()
						.contentType(ContentType.JSON)
						.body("""
								    {
								      "nombre": "Escuela N°66",
									  "localidad": "Bernal",
									  "direccion": "Brown 5066",
									  "telefono": "45674567"
								    }
								""")
						.when()
						.post("/api/escuelas")
						.then()
						.statusCode(201)
						.extract()
						.jsonPath()
						.getLong("id");

		long materiaId =
				given()
						.contentType(ContentType.JSON)
						.body("""
								    {
								      "nombre": "Matemática",
								      "abreviatura": "MAT",
								      "cantidadModulos": 4
								    }
								""")
						.when()
						.post("/api/escuelas/" + escuelaId + "/materias")
						.then()
						.statusCode(201)
						.extract()
						.jsonPath().
						getLong("id");


		given()
				.when()
				.get("/api/escuelas/" + escuelaId + "/materias")
				.then()
				.statusCode(200)
				.body("content.nombre", hasItem("Matemática"));

		given()
				.contentType(ContentType.JSON)
				.body("""
						    {
						      "nombre": "Matemática Avanzada",
						      "abreviatura": "MAT2",
						      "cantidadModulos": 5
						    }
						""")
				.when()
				.put("/api/escuelas/" + escuelaId + "/materias/" + materiaId)
				.then()
				.statusCode(200)
				.body("nombre", equalTo("Matemática Avanzada"));


		given()
				.when()
				.delete("/api/escuelas/" + escuelaId + "/materias/" + materiaId)
				.then()
				.statusCode(204);
	}
}