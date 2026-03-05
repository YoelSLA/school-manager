package com.gestion.escuela.gestion_escolar.rest;

import com.gestion.escuela.gestion_escolar.AbstractIntegrationTest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasItem;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CursoRestAssuredTest extends AbstractIntegrationTest {

	@LocalServerPort
	int port;

	@BeforeEach
	void setup() {
		RestAssured.port = port;
		RestAssured.baseURI = "http://localhost";
	}

	@Test
	void flujoCompletoCurso() {

		// 1️⃣ Crear escuela
		long escuelaId =
				given()
						.contentType(ContentType.JSON)
						.body("""
								{
								  "nombre": "Escuela N°77",
								  "localidad": "Quilmes",
								  "direccion": "Rivadavia 1234",
								  "telefono": "12345678"
								}
								""")
						.when()
						.post("/api/escuelas")
						.then()
						.statusCode(201)
						.extract()
						.jsonPath()
						.getLong("id");

		// 2️⃣ Crear curso
		long cursoId =
				given()
						.contentType(ContentType.JSON)
						.body("""
								{
								  "turno": "Mañana",
								  "anio": 1,
								  "grado": 1
								}
								""")
						.when()
						.post("/api/escuelas/" + escuelaId + "/cursos")
						.then()
						.statusCode(201)
						.extract()
						.jsonPath()
						.getLong("id");

		// 3️⃣ Listar cursos
		given()
				.when()
				.get("/api/escuelas/" + escuelaId + "/cursos")
				.then()
				.statusCode(200)
				.body("content.grado", hasItem(1));

		// 4️⃣ Actualizar curso
		given()
				.contentType(ContentType.JSON)
				.body("""
						{
						  "turno": "Mañana",
						  "anio": 1,
						  "grado": 3
						}
						""")
				.when()
				.put("/api/escuelas/" + escuelaId + "/cursos/" + cursoId)
				.then()
				.statusCode(200)
				.body("turno", equalTo("Mañana"))
				.body("anio", equalTo(1))
				.body("grado", equalTo(3));

		// 5️⃣ Eliminar curso
		given()
				.when()
				.delete("/api/escuelas/" + escuelaId + "/cursos/" + cursoId)
				.then()
				.statusCode(204);
	}
}