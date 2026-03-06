package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.curso.AnioInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.curso.GradoInvalidoException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static com.gestion.escuela.gestion_escolar.models.enums.Turno.MANIANA;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

@DisplayName("Tests de Curso")
class CursoTest {

	Escuela escuela;
	Curso curso;

	@BeforeEach
	void setUp() {
		escuela = mock(Escuela.class);
		curso = new Curso(MANIANA, 1, 1);
	}

	@Nested
	@DisplayName("Creación de curso")
	class CrearTest {

		@Test
		@DisplayName("Debe lanzar CampoObligatorioException si turno es null")
		void fallaSiTurnoEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new Curso(
							null,
							1,
							3
					)
			);
		}

		@Test
		@DisplayName("Debe lanzar CampoObligatorioException si año es null")
		void fallaSiAnioEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new Curso(
							MANIANA,
							null,
							3
					)
			);
		}

		@Test
		@DisplayName("Debe lanzar CampoObligatorioException si grado es null")
		void fallaSiGradoEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new Curso(
							MANIANA,
							1,
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
					() -> new Curso(MANIANA, anioInvalido, 3)
			);
		}

		@ParameterizedTest(name = "Debe fallar cuando grado = {0}")
		@ValueSource(ints = {0, -1})
		@DisplayName("Debe lanzar GradoInvalidoException cuando grado es menor o igual a 0")
		void fallaSiGradoEsInvalido(int gradoInvalido) {

			assertThrows(
					GradoInvalidoException.class,
					() -> new Curso(
							MANIANA,
							1,
							gradoInvalido
					)
			);
		}

		@Test
		@DisplayName("Debe crear un curso válido correctamente")
		void creaCursoValido() {

			Curso curso = new Curso(
					MANIANA,
					1,
					3
			);

			assertNull(curso.getId());
			assertNull(curso.getEscuela());
			assertEquals(MANIANA, curso.getTurno());
			assertEquals(1, curso.getAnio());
			assertEquals(3, curso.getGrado());

		}

	}

	@Nested
	@DisplayName("Actualización de curso")
	class ActualizarTest {

		@Test
		@DisplayName("Debe actualizar correctamente los datos del curso.")
		void actualizaCorrectamente() {

			curso.actualizar(MANIANA, 2, 2);

			assertNull(curso.getId());
			assertNull(curso.getEscuela());
			assertEquals(MANIANA, curso.getTurno());
			assertEquals(2, curso.getAnio());
			assertEquals(2, curso.getGrado());
		}

	}

	@Nested
	@DisplayName("Asignación de escuela al curso.")
	class AsignarEscuelaTest {

		@Test
		@DisplayName("Debe asignar la escuela correctamente")
		void asignaEscuelaCorrectamente() {

			curso.setEscuela(escuela);

			assertEquals(escuela, curso.getEscuela());
		}

		@Test
		@DisplayName("Debe fallar si la escuela es null")
		void fallaSiEscuelaEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> curso.setEscuela(null)
			);
		}

	}

	@Nested
	@DisplayName("Representación de año y división")
	class AnioDivision {

		@Test
		@DisplayName("Debe retornar correctamente el formato 'anio° grado'")
		void retornaFormatoCorrecto() {

			assertEquals("1° 1", curso.anioDivision());
		}
	}

	@Nested
	@DisplayName("Representación textual del curso")
	class ToStringTest {

		@Test
		@DisplayName("Debe retornar formato correcto en toString")
		void retornaFormatoCorrecto() {

			assertEquals("1° 1 - Mañana", curso.toString());
		}
	}
}