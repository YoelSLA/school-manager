package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.AbstractIntegrationTest;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoDuplicadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static com.gestion.escuela.gestion_escolar.models.enums.Turno.MANIANA;
import static com.gestion.escuela.gestion_escolar.models.enums.Turno.TARDE;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class CursoServiceTest extends AbstractIntegrationTest {

	@Autowired
	private EscuelaService escuelaService;

	@Autowired
	private CursoService cursoService;

	private Escuela escuelaBDD;

	@BeforeEach
	void setUp() {
		Escuela escuelaModelo = new Escuela(
				"Escuela N°65",
				"San Francisco Solano",
				"Avenida Provincial 849",
				"1142130357");

		escuelaBDD = escuelaService.crear(escuelaModelo);
	}

	@Nested
	@DisplayName("Creación de curso")
	class CrearCurso {

		Curso cursoM;

		@BeforeEach
		void setUp() {

			cursoM = new Curso(
					MANIANA,
					1,
					2
			);

		}

		@Test
		@DisplayName("Debe crear un curso correctamente.")
		void crearCursoaCorrectamente() {

			Curso curso = cursoService.crear(escuelaBDD.getId(), cursoM);

			assertNotNull(curso.getId());
			assertEquals(MANIANA, curso.getTurno());
			assertEquals(1, curso.getAnio());
			assertEquals(2, curso.getGrado());
			assertEquals(escuelaBDD.getId(), curso.getEscuela().getId());
		}

		@Test
		@DisplayName("Debe lanzar excepción si ya existe un curso con el año, grado y turno en la escuela.")
		void fallaSiMateriaDuplicadaEnLaMismaEscuela() {


			cursoService.crear(escuelaBDD.getId(), cursoM);
			Curso cursoMDuplicado = new Curso(
					cursoM.getTurno(),
					cursoM.getAnio(),
					cursoM.getGrado()
			);

			assertThrows(
					RecursoDuplicadoException.class,
					() -> cursoService.crear(escuelaBDD.getId(), cursoMDuplicado)
			);
		}

	}

	@Nested
	@DisplayName("Crear batch de cursos")
	class CrearBatchTest {

		@Test
		@DisplayName("No debe hacer nada si la lista es null")
		void noHaceNadaSiListaEsNull() {

			cursoService.crearBatch(escuelaBDD.getId(), null);

			List<Curso> cursos = cursoService.listarCursosPorEscuela(escuelaBDD.getId());

			assertTrue(cursos.isEmpty());
		}

		@Test
		@DisplayName("No debe hacer nada si la lista está vacía")
		void noHaceNadaSiListaVacia() {

			cursoService.crearBatch(escuelaBDD.getId(), List.of());

			List<Curso> cursos = cursoService.listarCursosPorEscuela(escuelaBDD.getId());

			assertTrue(cursos.isEmpty());
		}

		@Test
		@DisplayName("Debe lanzar excepción si la escuela no existe.")
		void fallaSiEscuelaNoExiste() {

			assertThrows(
					RecursoNoEncontradoException.class,
					() -> cursoService.crearBatch(999L, List.of(mock(Curso.class)))
			);
		}

		@Test
		@DisplayName("Debe lanzar excepción si algun curso ya existe en la escuela.")
		void fallaSiAlgunaMateriaEsDuplicada() {

			cursoService.crear(
					escuelaBDD.getId(),
					new Curso(MANIANA, 1, 1)
			);

			List<Curso> nuevas = List.of(
					new Curso(MANIANA, 1, 2),
					new Curso(MANIANA, 1, 1)
			);

			assertThrows(
					RecursoDuplicadoException.class,
					() -> cursoService.crearBatch(escuelaBDD.getId(), nuevas)
			);
		}

		@Test
		@DisplayName("Debe crear todos los cursos correctamente")
		void creaTodasLasMateriasCorrectamente() {

			List<Curso> cursos = List.of(
					new Curso(MANIANA, 1, 1),
					new Curso(MANIANA, 1, 2)
			);

			cursoService.crearBatch(escuelaBDD.getId(), cursos);

			List<Curso> guardadas = cursoService.listarCursosPorEscuela(escuelaBDD.getId());

			assertEquals(2, guardadas.size());
		}
	}

	@Nested
	@DisplayName("Obtener curso por ID")
	class ObtenerPorIdTest {

		@Test
		@DisplayName("Debe devolver el curso cuando existe")
		void devuelveMateriaSiExiste() {

			Curso creada = cursoService.crear(
					escuelaBDD.getId(),
					new Curso(MANIANA, 1, 1)
			);

			Curso encontrada = cursoService.obtenerPorId(creada.getId());

			assertEquals(creada.getId(), encontrada.getId());
			assertEquals(MANIANA, encontrada.getTurno());
			assertEquals(1, encontrada.getAnio());
			assertEquals(1, encontrada.getGrado());

		}

		@Test
		@DisplayName("Debe lanzar excepción cuando el curso no existe.")
		void fallaSiNoExiste() {

			assertThrows(
					RecursoNoEncontradoException.class,
					() -> cursoService.obtenerPorId(99L)
			);
		}
	}

	@Nested
	@DisplayName("Listar cursos paginados por escuela.")
	class ListarCursosPorEscuelaTest {

		@Test
		@DisplayName("Debe lanzar excepción si la escuela no existe")
		void fallaSiEscuelaNoExiste() {

			Pageable pageable = PageRequest.of(0, 10);

			assertThrows(
					RecursoNoEncontradoException.class,
					() -> cursoService.listarCursosPorEscuela(99L, MANIANA, pageable)
			);
		}

		@Test
		@DisplayName("Debe listar cursos ordenados por turno, año y grado ascendente")
		void listaOrdenadoPorNombreAsc() {

			cursoService.crear(escuelaBDD.getId(),
					new Curso(MANIANA, 1, 1));

			cursoService.crear(escuelaBDD.getId(),
					new Curso(MANIANA, 3, 1));

			cursoService.crear(escuelaBDD.getId(),
					new Curso(MANIANA, 2, 1));


			Pageable pageable = PageRequest.of(0, 10);

			Page<Curso> pagina =
					cursoService.listarCursosPorEscuela(
							escuelaBDD.getId(),
							MANIANA,
							pageable
					);

			List<Curso> cursos = pagina.getContent();

			assertEquals(3, cursos.size());
			assertEquals("1° 1", cursos.get(0).anioDivision());
			assertEquals("2° 1", cursos.get(1).anioDivision());
			assertEquals("3° 1", cursos.get(2).anioDivision());
		}

		@Test
		@DisplayName("Debe respetar la paginación")
		void respetaLaPaginacion() {

			cursoService.crear(escuelaBDD.getId(),
					new Curso(MANIANA, 1, 1));

			cursoService.crear(escuelaBDD.getId(),
					new Curso(MANIANA, 3, 1));

			cursoService.crear(escuelaBDD.getId(),
					new Curso(MANIANA, 2, 1));

			Pageable pageable = PageRequest.of(0, 2);

			Page<Curso> pagina =
					cursoService.listarCursosPorEscuela(
							escuelaBDD.getId(),
							MANIANA,
							pageable
					);

			assertEquals(2, pagina.getContent().size());
			assertEquals(3, pagina.getTotalElements());
		}
	}

	@Nested
	@DisplayName("Eliminar curso de la escuela.")
	class EliminarTest {

		@Test
		@DisplayName("Debe lanzar excepción si la escuela no existe")
		void fallaSiEscuelaNoExiste() {

			assertThrows(
					RecursoNoEncontradoException.class,
					() -> cursoService.eliminar(99L, 1L)
			);
		}

		@Test
		@DisplayName("Debe lanzar excepción si el curso no existe en la escuela")
		void fallaSiMateriaNoExiste() {

			assertThrows(
					RecursoNoEncontradoException.class,
					() -> cursoService.eliminar(escuelaBDD.getId(), 99L)
			);
		}

		@Test
		@DisplayName("Debe eliminar el curso correctamente")
		void eliminaMateriaCorrectamente() {

			Curso cursoModelo = new Curso(MANIANA, 1, 1);

			Curso cursoBDD = cursoService.crear(escuelaBDD.getId(), cursoModelo);

			cursoService.eliminar(escuelaBDD.getId(), cursoBDD.getId());

			assertThrows(
					RecursoNoEncontradoException.class,
					() -> cursoService.obtenerPorId(cursoBDD.getId())
			);
		}

		@Test
		@DisplayName("Debe lanzar excepción de dominio si el curso pertenece a otra escuela")
		void fallaSiMateriaPerteneceAOtraEscuela() {

			Escuela escuelaModelo = new Escuela(
					"test",
					"test",
					"test",
					"11421303");

			Curso cursoModelo = new Curso(MANIANA, 1, 1);

			Escuela otraEscuelaBDD = escuelaService.crear(escuelaModelo);

			Curso curso = cursoService.crear(escuelaBDD.getId(), cursoModelo);

			assertThrows(
					RecursoNoEncontradoException.class,
					() -> cursoService.eliminar(otraEscuelaBDD.getId(), curso.getId())
			);
		}
	}

	@Nested
	@DisplayName("actualizar")
	class ActualizarTest {

		@Test
		@DisplayName("Debe lanzar excepción si el curso no existe en la escuela.")
		void fallaSiMateriaNoExiste() {

			assertThrows(
					RecursoNoEncontradoException.class,
					() -> cursoService.actualizar(
							escuelaBDD.getId(),
							99L,
							1,
							1,
							TARDE
					)
			);
		}

		@Test
		@DisplayName("Debe actualizar correctamente el curso")
		void actualizaCorrectamente() {

			// Arrange
			Curso cursoModelo = new Curso(MANIANA, 1, 1);
			Curso cursoBDD = cursoService.crear(escuelaBDD.getId(), cursoModelo);

			assertNotNull(cursoBDD.getId());
			assertEquals(MANIANA, cursoModelo.getTurno());
			assertEquals(1, cursoModelo.getAnio());
			assertEquals(1, cursoModelo.getGrado());

			// Act
			Curso cursoBDDActualizado = cursoService.actualizar(
					escuelaBDD.getId(),
					cursoBDD.getId(),
					1,
					2,
					MANIANA
			);

			// Assert
			assertEquals(1, cursoBDDActualizado.getAnio());
			assertEquals(2, cursoBDDActualizado.getGrado());
			assertEquals("1° 2", cursoBDDActualizado.anioDivision());
			assertEquals(MANIANA, cursoBDDActualizado.getTurno());

		}

		@Test
		@DisplayName("Debe lanzar excepción de dominio si los datos son inválidos")
		void fallaSiDatosInvalidos() {

			// Arrange
			Curso cursoModelo = new Curso(MANIANA, 1, 1);
			Curso cursoBDD = cursoService.crear(escuelaBDD.getId(), cursoModelo);

			assertThrows(
					CampoObligatorioException.class,
					() -> cursoService.actualizar(
							escuelaBDD.getId(),
							cursoBDD.getId(),
							null,
							1,
							TARDE
					)
			);
		}
	}


}