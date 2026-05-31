package com.gestion.escuela.gestion_escolar.rest;

import com.gestion.escuela.gestion_escolar.AbstractIntegrationTest;
import com.gestion.escuela.gestion_escolar.controllers.dtos.curso.request.CursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.curso.request.CursoUpdateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.escuela.request.EscuelaCreateDTO;
import com.gestion.escuela.gestion_escolar.models.enums.Turno;
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

		EscuelaCreateDTO escuelaCreateDTO =
				new EscuelaCreateDTO(
						"Escuela N°77",
						"Quilmes",
						"Rivadavia 1234",
						"12345678"
				);

		// 1️ Crear escuela
		long escuelaId =
				given()
						.contentType(ContentType.JSON)
						.body(escuelaCreateDTO)
						.when()
						.post("/api/escuelas")
						.then()
						.statusCode(201)
						.extract()
						.jsonPath()
						.getLong("id");

		// 2️ Crear curso

		CursoCreateDTO cursoCreateDTO = new CursoCreateDTO(
						Turno.MANIANA,
						1,
						1
				);

		long cursoId = given()
						.contentType(ContentType.JSON)
						.body(cursoCreateDTO)
						.when()
						.post("/api/escuelas/" + escuelaId + "/cursos")
						.then()
						.statusCode(201)
						.extract()
						.jsonPath()
						.getLong("id");

		// 3️ Listar curso
		given()
				.when()
				.get("/api/escuelas/" + escuelaId + "/cursos")
				.then()
				.statusCode(200)
				.body("content.grado", hasItem(1));

		// 4️ Actualizar curso
		CursoUpdateDTO cursoUpdateDTO =
				new CursoUpdateDTO(
						Turno.MANIANA,
						1,
						3
				);

		given()
				.contentType(ContentType.JSON)
				.body(cursoUpdateDTO)
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