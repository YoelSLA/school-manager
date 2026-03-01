package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.materia.CantidadModulosInvalidaException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;

@DisplayName("Tests de Materia")
class MateriaTest {

	Escuela escuela;
	Materia materia;

	@BeforeEach
	void setUp() {
		escuela = mock(Escuela.class);
		materia = new Materia(
				"Ciencias Naturales",
				"CNT",
				4
		);
	}

	@Nested
	@DisplayName("Creación de Materia")
	class Creacion {

		@ParameterizedTest(name = "Debe fallar con cuil = ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("Debe fallar si el nombre es null, vacío o solo espacios")
		void fallaSiNombreInvalido(String nombreInvalido) {
			assertThrows(
					CampoObligatorioException.class,
					() -> new Materia(
							nombreInvalido,
							"CNT",
							4
					)
			);
		}

		@ParameterizedTest(name = "Debe fallar con cuil = ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("Debe fallar si el abreviatura es null, vacío o solo espacios")
		void fallaSiAbreviaturaInvalida(String abreviaturaInvalida) {
			assertThrows(
					CampoObligatorioException.class,
					() -> new Materia(
							"Ciencias Naturales",
							abreviaturaInvalida,
							4
					)
			);
		}

		@ParameterizedTest(name = "Debe fallar con cantidadDeModulos = {0}")
		@ValueSource(ints = {0, -1})
		@DisplayName("Debe fallar si la cantidad de módulos es 0 o negativa")
		void fallaSiCantidadDeModulosEsInvalida(int cantidadInvalida) {

			assertThrows(
					CantidadModulosInvalidaException.class,
					() -> new Materia(
							"Ciencias Naturales",
							"CNT",
							cantidadInvalida
					)
			);
		}


		@Test
		@DisplayName("Debe crear una materia válida correctamente")
		void creaMateriaValida() {

			Materia materia = new Materia(
					"Ciencias Naturales",
					"CNT",
					4
			);

			assertEquals("Ciencias Naturales", materia.getNombre());
			assertEquals("CNT", materia.getAbreviatura());
			assertEquals(4, materia.getCantidadModulos());
		}

	}

	@Nested
	@DisplayName("actualizar")
	class ActualizarTest {

		@Test
		@DisplayName("Debe actualizar correctamente los datos de la materia")
		void actualizaCorrectamente() {

			String nuevoNombre = "Matemática Aplicada";
			String nuevaAbreviatura = "MATA";
			Integer nuevaCantidad = 6;

			materia.actualizar(nuevoNombre, nuevaAbreviatura, nuevaCantidad);

			assertEquals(nuevoNombre, materia.getNombre());
			assertEquals(nuevaAbreviatura, materia.getAbreviatura());
			assertEquals(nuevaCantidad, materia.getCantidadModulos());
		}
	}

	@Nested
	@DisplayName("setEscuela")
	class SetEscuelaTest {

		@Test
		@DisplayName("Debe asignar la escuela correctamente")
		void asignaEscuelaCorrectamente() {

			materia.setEscuela(escuela);

			assertEquals(escuela, materia.getEscuela());
		}

		@Test
		@DisplayName("Debe fallar si la escuela es null")
		void fallaSiEscuelaEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> materia.setEscuela(null)
			);
		}
	}

	@Nested
	@DisplayName("toString")
	class ToStringTest {

		@Test
		@DisplayName("Debe mostrar 'módulo' en singular cuando la cantidad es 1")
		void muestraModuloEnSingular() {
			Materia materia = new Materia("Matemática", "MAT", 1);

			String esperado = "Matemática (MAT) - 1 módulo";

			assertEquals(esperado, materia.toString());
		}

		@Test
		@DisplayName("Debe mostrar 'módulos' en plural cuando la cantidad es mayor a 1")
		void muestraModulosEnPlural() {

			String esperado = "Ciencias Naturales (CNT) - 4 módulos";

			assertEquals(esperado, materia.toString());
		}
	}

}