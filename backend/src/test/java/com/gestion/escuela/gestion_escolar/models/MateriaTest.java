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

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
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

		@ParameterizedTest(name = "Nombre inválido: ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("No se puede crear una materia sin nombre válido.")
		void fallaSiNombreInvalido(String nombreInvalido) {
			assertThatThrownBy(() -> new Materia(nombreInvalido, "CNT", 4))
					.isInstanceOf(CampoObligatorioException.class)
					.hasMessageContaining("nombre");
		}

		@ParameterizedTest(name = "Abreviatura inválida: ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("No se puede crear una materia sin abreviatura válida.")
		void fallaSiAbreviaturaInvalida(String abreviaturaInvalida) {
			assertThatThrownBy(() -> new Materia("Ciencias Naturales", abreviaturaInvalida, 4))
					.isInstanceOf(CampoObligatorioException.class)
					.hasMessageContaining("abreviatura");
		}

		@ParameterizedTest(name = "Cantidad inválida: {0}")
		@ValueSource(ints = {0, -1})
		@DisplayName("No se puede crear una materia con cantidad de módulos inválida")
		void fallaSiCantidadInvalida(int cantidad) {
			assertThatThrownBy(() -> new Materia("Ciencias Naturales", "CNT", cantidad))
					.isInstanceOf(CantidadModulosInvalidaException.class);
		}

		@Test
		@DisplayName("Se crea una materia válida correctamente")
		void creaMateriaValida() {
			Materia materia = new Materia("Ciencias Naturales", "CNT", 4);

			assertThat(materia)
					.extracting(Materia::getNombre, Materia::getAbreviatura, Materia::getCantidadModulos)
					.containsExactly("Ciencias Naturales", "CNT", 4);
		}

	}

	@Nested
	@DisplayName("Actualización de materia")
	class Actualizar {

		@Test
		@DisplayName("Se actualizan correctamente los datos de la materia.")
		void actualizaCorrectamente() {
			Materia materia = new Materia("Ciencias Naturales", "CNT", 4);

			materia.actualizar("Matemática Aplicada", "MATA", 6);

			assertThat(materia)
					.extracting(Materia::getNombre, Materia::getAbreviatura, Materia::getCantidadModulos)
					.containsExactly("Matemática Aplicada", "MATA", 6);
		}
	}

	@Nested
	@DisplayName("Asignación de escuela")
	class SetEscuela {

		@Test
		@DisplayName("Se asigna correctamente la escuela")
		void asignaEscuela() {

			materia.setEscuela(escuela);

			assertThat(materia.getEscuela()).isEqualTo(escuela);
		}

		@Test
		@DisplayName("No se puede asignar una escuela null")
		void fallaSiEscuelaNull() {

			assertThatThrownBy(() -> materia.setEscuela(null)).isInstanceOf(CampoObligatorioException.class);
		}
	}

	@Nested
	@DisplayName("Representación textual")
	class ToStringTest {

		@Test
		@DisplayName("Muestra 'módulo' en singular cuando la cantidad es 1.")
		void muestraSingular() {
			Materia materia = new Materia("Matemática", "MAT", 1);

			assertThat(materia.toString()).isEqualTo("Matemática (MAT) - 1 módulo");
		}

		@Test
		@DisplayName("Muestra 'módulos' en plural cuando la cantidad es mayor a 1.")
		void muestraPlural() {
			Materia materia = new Materia("Ciencias Naturales", "CNT", 4);

			assertThat(materia.toString()).isEqualTo("Ciencias Naturales (CNT) - 4 módulos");
		}
	}

}