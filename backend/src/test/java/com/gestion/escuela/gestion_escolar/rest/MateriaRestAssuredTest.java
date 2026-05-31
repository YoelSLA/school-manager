package com.gestion.escuela.gestion_escolar.rest;

import com.gestion.escuela.gestion_escolar.AbstractIntegrationTest;
import com.gestion.escuela.gestion_escolar.controllers.dtos.escuela.request.EscuelaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materia.request.MateriaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materia.request.MateriaUpdateDTO;
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
class MateriaRestAssuredTest extends AbstractIntegrationTest {

	@LocalServerPort
	int port;

	@BeforeEach
	void setup() {
		RestAssured.port = port;
		RestAssured.baseURI = "http://localhost";
	}

	@Test
	void flujoCompletoMateria() {

		EscuelaCreateDTO escuelaDTO = new EscuelaCreateDTO(
				"Escuela N°66",
				"Bernal",
				"Brown 5066",
				"45674567"
		);

		long escuelaId = given()
						.contentType(ContentType.JSON)
						.body(escuelaDTO)
						.when()
						.post("/api/escuelas")
						.then()
						.statusCode(201)
						.extract()
						.jsonPath()
						.getLong("id");

		MateriaCreateDTO materiaDTO = new MateriaCreateDTO(
				"Matemática",
				"MAT",
				4
		);

		long materiaId = given()
						.contentType(ContentType.JSON)
						.body(materiaDTO)
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


		MateriaUpdateDTO updateDTO = new MateriaUpdateDTO(
				"Matemática Avanzada",
				"MAT2",
				5
		);

		given()
				.contentType(ContentType.JSON)
				.body(updateDTO)
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