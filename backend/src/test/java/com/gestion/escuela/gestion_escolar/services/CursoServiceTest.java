package com.gestion.escuela.gestion_escolar.services;


import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.enums.Turno;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.TimeZone;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@ActiveProfiles("test")
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class CursoServiceTest {

	@Container
	static PostgreSQLContainer<?> postgres =
			new PostgreSQLContainer<>("postgres:15")
					.withDatabaseName("testdb")
					.withUsername("test")
					.withPassword("test")
					.withEnv("TZ", "UTC")
					.withCommand("postgres", "-c", "timezone=UTC");

	@Autowired
	private EscuelaService escuelaService;

	@Autowired
	private CursoService cursoService;

	@DynamicPropertySource
	static void configureProperties(DynamicPropertyRegistry registry) {
		registry.add("spring.datasource.url", postgres::getJdbcUrl);
		registry.add("spring.datasource.username", postgres::getUsername);
		registry.add("spring.datasource.password", postgres::getPassword);

		registry.add("spring.jpa.properties.hibernate.jdbc.time_zone", () -> "UTC");
		registry.add("spring.datasource.hikari.data-source-properties.TimeZone", () -> "UTC");
	}

	@BeforeAll
	static void forceUtc() {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

	@Test
	void crearCursoYVerificarQueExiste() {

		Escuela escuela = escuelaService.crear(
				new Escuela(
						"Escuela N°1",
						"Quilmes",
						"Av. Siempre Viva 123",
						"11-1234-5678"
				)
		);

		cursoService.crear(
				new Curso(
						Turno.MANIANA,
						1,
						3,
						escuela
				)
		);

		boolean existe = cursoService
				.buscarTodosPorEscuela(escuela.getId())
				.stream()
				.anyMatch(c -> c.getAnio() == 1 && c.getGrado() == 3);

		assertTrue(existe);
	}
}