package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.Turno;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.curso.AnioInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.curso.GradoInvalidoException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Tests de Curso")
class CursoTest {

	private Escuela escuelaDummy() {
		return new Escuela();
	}

	// ==============================
	// CREACIÓN
	// ==============================

	@Nested
	@DisplayName("Creación de Curso")
	class Creacion {

		@Test
		@DisplayName("Debe crear un curso válido correctamente")
		void creaCursoValido() {

			Curso curso = new Curso(
					Turno.MANIANA,
					1,
					3,
					escuelaDummy()
			);

			assertEquals(Turno.MANIANA, curso.getTurno());
			assertEquals(1, curso.getAnio());
			assertEquals(3, curso.getGrado());
			assertNotNull(curso.getEscuela());
		}

		@Test
		@DisplayName("Debe lanzar CampoObligatorioException si turno es null")
		void fallaSiTurnoEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new Curso(
							null,
							1,
							3,
							escuelaDummy()
					)
			);
		}

		@Test
		@DisplayName("Debe lanzar CampoObligatorioException si año es null")
		void fallaSiAnioEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new Curso(
							Turno.MANIANA,
							null,
							3,
							escuelaDummy()
					)
			);
		}

		@Test
		@DisplayName("Debe lanzar CampoObligatorioException si grado es null")
		void fallaSiGradoEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new Curso(
							Turno.MANIANA,
							1,
							null,
							escuelaDummy()
					)
			);
		}

		@Test
		@DisplayName("Debe lanzar CampoObligatorioException si escuela es null")
		void fallaSiEscuelaEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new Curso(
							Turno.MANIANA,
							1,
							3,
							null
					)
			);
		}

		@ParameterizedTest(name = "Debe fallar cuando año = {0}")
		@ValueSource(ints = {0, -1})
		@DisplayName("Debe lanzar AnioInvalidoException cuando año es menor o igual a 0")
		void fallaSiAnioEsInvalido(int anioInvalido) {

			assertThrows(
					AnioInvalidoException.class,
					() -> new Curso(
							Turno.MANIANA,
							anioInvalido,
							3,
							escuelaDummy()
					)
			);
		}

		@ParameterizedTest(name = "Debe fallar cuando grado = {0}")
		@ValueSource(ints = {0, -1})
		@DisplayName("Debe lanzar GradoInvalidoException cuando grado es menor o igual a 0")
		void fallaSiGradoEsInvalido(int gradoInvalido) {

			assertThrows(
					GradoInvalidoException.class,
					() -> new Curso(
							Turno.MANIANA,
							1,
							gradoInvalido,
							escuelaDummy()
					)
			);
		}

		@Test
		@DisplayName("Debe permitir año y grado igual a 1 (valor mínimo válido)")
		void permiteValoresLimiteValidos() {

			assertDoesNotThrow(() -> new Curso(
					Turno.MANIANA,
					1,
					1,
					escuelaDummy()
			));
		}
	}

	// ==============================
	// ANIO DIVISION
	// ==============================

	@Nested
	@DisplayName("Representación de año y división")
	class AnioDivision {

		@Test
		@DisplayName("Debe retornar correctamente el formato 'anio° grado'")
		void retornaFormatoCorrecto() {

			Curso curso = new Curso(
					Turno.TARDE,
					2,
					4,
					escuelaDummy()
			);

			assertEquals("2° 4", curso.anioDivision());
		}
	}

	// ==============================
	// ASIGNACIÓN DE ESCUELA
	// ==============================

	@Nested
	@DisplayName("Asignación de escuela")
	class AsignacionEscuela {

		@Test
		@DisplayName("Debe asignar correctamente una nueva escuela al curso")
		void asignaNuevaEscuelaCorrectamente() {

			Escuela escuelaInicial = escuelaDummy();
			Escuela nuevaEscuela = escuelaDummy();

			Curso curso = new Curso(
					Turno.MANIANA,
					1,
					3,
					escuelaInicial
			);

			curso.asignarAEscuela(nuevaEscuela);

			assertEquals(nuevaEscuela, curso.getEscuela());
		}

		@Test
		@DisplayName("Debe lanzar CampoObligatorioException si se intenta asignar escuela null")
		void fallaSiEscuelaEsNull() {

			Curso curso = new Curso(
					Turno.MANIANA,
					1,
					3,
					escuelaDummy()
			);

			assertThrows(
					CampoObligatorioException.class,
					() -> curso.asignarAEscuela(null)
			);
		}
	}


	// ==============================
	// TO STRING
	// ==============================

	@Nested
	@DisplayName("Representación textual del curso")
	class ToStringTest {

		@Test
		@DisplayName("Debe retornar formato correcto en toString")
		void retornaFormatoCorrecto() {

			Curso curso = new Curso(
					Turno.VESPERTINO,
					3,
					2,
					escuelaDummy()
			);

			assertEquals("3° 2 - VESPERTINO", curso.toString());
		}
	}
}