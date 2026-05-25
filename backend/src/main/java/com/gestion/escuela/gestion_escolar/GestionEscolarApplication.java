package com.gestion.escuela.gestion_escolar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class GestionEscolarApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestionEscolarApplication.class, args);
	}

}
