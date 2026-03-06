package com.gestion.escuela.gestion_escolar;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.condition.DisabledIfEnvironmentVariable;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.TimeZone;

@Tag("integration")
@SpringBootTest
@ActiveProfiles("test")
@Testcontainers(disabledWithoutDocker = true)
@Transactional
@DisabledIfEnvironmentVariable(named = "CI", matches = "true")
public abstract class AbstractIntegrationTest {

	@SuppressWarnings("resource")
	@Container
	static PostgreSQLContainer<?> postgres =
			new PostgreSQLContainer<>("postgres:15")
					.withDatabaseName("testdb")
					.withUsername("test")
					.withPassword("test")
					.withEnv("TZ", "UTC")
					.withCommand("postgres", "-c", "timezone=UTC");

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
}
