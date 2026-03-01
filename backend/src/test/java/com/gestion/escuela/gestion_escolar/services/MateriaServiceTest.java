package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoDuplicadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.List;
import java.util.TimeZone;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class MateriaServiceTest {

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
	private MateriaService materiaService;

	private Escuela escuelaBDD;

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
	@DisplayName("Creación de materia")
	class CrearMateria {

		@Test
		@DisplayName("Debe crear una materia correctamente")
		void creaMateriaCorrectamente() {

			Materia materiaM = new Materia(
					"Ciencias Naturales",
					"CNT",
					4
			);

			Materia materia = materiaService.crear(escuelaBDD.getId(), materiaM);

			assertNotNull(materia.getId());
			assertEquals("Ciencias Naturales", materia.getNombre());
			assertEquals("CNT", materia.getAbreviatura());
			assertEquals(4, materia.getCantidadModulos());
			assertEquals(escuelaBDD.getId(), materia.getEscuela().getId());
		}

		@Test
		@DisplayName("Debe lanzar excepción si ya existe una materia con el mismo nombre en la escuela")
		void fallaSiMateriaDuplicadaEnLaMismaEscuela() {

			Materia materiaM = new Materia(
					"Ciencias Naturales",
					"CNT",
					4
			);

			materiaService.crear(escuelaBDD.getId(), materiaM);
			Materia materiaMDuplicada = new Materia("Ciencias Naturales", "CNT", 4);

			assertThrows(
					RecursoDuplicadoException.class,
					() -> materiaService.crear(escuelaBDD.getId(), materiaMDuplicada)
			);
		}

	}

	@Nested
	@DisplayName("Crear batch de materias")
	class CrearBatchTest {

		@Test
		@DisplayName("No debe hacer nada si la lista es null")
		void noHaceNadaSiListaEsNull() {

			materiaService.crearBatch(escuelaBDD.getId(), null);

			List<Materia> materias = materiaService.listarMateriasPorEscuela(escuelaBDD.getId());

			assertTrue(materias.isEmpty());
		}

		@Test
		@DisplayName("No debe hacer nada si la lista está vacía")
		void noHaceNadaSiListaVacia() {

			materiaService.crearBatch(escuelaBDD.getId(), List.of());

			List<Materia> materias =
					materiaService.listarMateriasPorEscuela(escuelaBDD.getId());

			assertTrue(materias.isEmpty());
		}

		@Test
		@DisplayName("Debe lanzar excepción si la escuela no existe")
		void fallaSiEscuelaNoExiste() {

			List<Materia> materias = List.of(new Materia("Física", "FIS", 4)
			);

			assertThrows(
					RecursoNoEncontradoException.class,
					() -> materiaService.crearBatch(999L, materias)
			);
		}

		@Test
		@DisplayName("Debe lanzar excepción si alguna materia ya existe en la escuela")
		void fallaSiAlgunaMateriaEsDuplicada() {

			materiaService.crear(
					escuelaBDD.getId(),
					new Materia("Química", "QUI", 4)
			);

			List<Materia> nuevas = List.of(
					new Materia("Química", "QUI2", 6),
					new Materia("Biología", "BIO", 4)
			);

			assertThrows(
					RecursoDuplicadoException.class,
					() -> materiaService.crearBatch(escuelaBDD.getId(), nuevas)
			);
		}

		@Test
		@DisplayName("Debe crear todas las materias correctamente")
		void creaTodasLasMateriasCorrectamente() {

			List<Materia> materias = List.of(
					new Materia("Historia", "HIS", 4),
					new Materia("Geografía", "GEO", 3)
			);

			materiaService.crearBatch(escuelaBDD.getId(), materias);

			List<Materia> guardadas =
					materiaService.listarMateriasPorEscuela(escuelaBDD.getId());

			assertEquals(2, guardadas.size());
		}
	}

	@Nested
	@DisplayName("Obtener materia por ID")
	class ObtenerPorIdTest {

		@Test
		@DisplayName("Debe devolver la materia cuando existe")
		void devuelveMateriaSiExiste() {

			// Arrange
			Materia creada = materiaService.crear(
					escuelaBDD.getId(),
					new Materia("Física", "FIS", 4)
			);

			// Act
			Materia encontrada = materiaService.obtenerPorId(creada.getId());

			// Assert
			assertEquals(creada.getId(), encontrada.getId());
			assertEquals("Física", encontrada.getNombre());
			assertEquals("FIS", encontrada.getAbreviatura());
			assertEquals(4, encontrada.getCantidadModulos());
		}

		@Test
		@DisplayName("Debe lanzar excepción cuando la materia no existe")
		void fallaSiNoExiste() {

			assertThrows(
					RecursoNoEncontradoException.class,
					() -> materiaService.obtenerPorId(999999L)
			);
		}
	}

	@Nested
	@DisplayName("Listar materias paginadas por escuela.")
	class ListarMateriasPorEscuelaTest {

		@Test
		@DisplayName("Debe lanzar excepción si la escuela no existe")
		void fallaSiEscuelaNoExiste() {

			Pageable pageable = PageRequest.of(0, 10);

			assertThrows(
					RecursoNoEncontradoException.class,
					() -> materiaService.listarMateriasPorEscuela(999L, pageable)
			);
		}

		@Test
		@DisplayName("Debe listar materias ordenadas por nombre ascendente")
		void listaOrdenadoPorNombreAsc() {

			// Arrange
			materiaService.crear(escuelaBDD.getId(),
					new Materia("Zoología", "ZOO", 4));

			materiaService.crear(escuelaBDD.getId(),
					new Materia("Biología", "BIO", 4));

			materiaService.crear(escuelaBDD.getId(),
					new Materia("Análisis Matemático", "ANA", 4));

			Pageable pageable = PageRequest.of(0, 10);

			// Act
			Page<Materia> pagina =
					materiaService.listarMateriasPorEscuela(
							escuelaBDD.getId(),
							pageable
					);

			// Assert
			List<Materia> materias = pagina.getContent();

			assertEquals(3, materias.size());
			assertEquals("Análisis Matemático", materias.get(0).getNombre());
			assertEquals("Biología", materias.get(1).getNombre());
			assertEquals("Zoología", materias.get(2).getNombre());
		}

		@Test
		@DisplayName("Debe respetar la paginación")
		void respetaLaPaginacion() {

			materiaService.crear(escuelaBDD.getId(),
					new Materia("A", "A", 4));

			materiaService.crear(escuelaBDD.getId(),
					new Materia("B", "B", 4));

			materiaService.crear(escuelaBDD.getId(),
					new Materia("C", "C", 4));

			Pageable pageable = PageRequest.of(0, 2);

			Page<Materia> pagina =
					materiaService.listarMateriasPorEscuela(
							escuelaBDD.getId(),
							pageable
					);

			assertEquals(2, pagina.getContent().size());
			assertEquals(3, pagina.getTotalElements());
		}
	}

	@Nested
	@DisplayName("Eliminar materia de la escuela.")
	class EliminarTest {

		@Test
		@DisplayName("Debe lanzar excepción si la escuela no existe")
		void fallaSiEscuelaNoExiste() {

			assertThrows(
					RecursoNoEncontradoException.class,
					() -> materiaService.eliminar(999L, 1L)
			);
		}

		@Test
		@DisplayName("Debe lanzar excepción si la materia no existe en la escuela")
		void fallaSiMateriaNoExiste() {

			assertThrows(
					RecursoNoEncontradoException.class,
					() -> materiaService.eliminar(escuelaBDD.getId(), 999L)
			);
		}

		@Test
		@DisplayName("Debe eliminar la materia correctamente")
		void eliminaMateriaCorrectamente() {

			// Arrange
			Materia creada = materiaService.crear(
					escuelaBDD.getId(),
					new Materia("Filosofía", "FIL", 4)
			);

			// Act
			materiaService.eliminar(
					escuelaBDD.getId(),
					creada.getId()
			);

			// Assert
			assertThrows(
					RecursoNoEncontradoException.class,
					() -> materiaService.obtenerPorId(creada.getId())
			);
		}

		@Test
		@DisplayName("Debe lanzar excepción de dominio si la materia pertenece a otra escuela")
		void fallaSiMateriaPerteneceAOtraEscuela() {

			Escuela otraEscuelaModelo = new Escuela(
					"test",
					"test",
					"test",
					"11421303");


			Escuela otraEscuela = escuelaService.crear(otraEscuelaModelo);

			Materia materia = materiaService.crear(
					otraEscuela.getId(),
					new Materia("Arte", "ART", 4)
			);

			assertThrows(
					RecursoNoEncontradoException.class,
					() -> materiaService.eliminar(
							escuelaBDD.getId(),
							materia.getId()
					)
			);
		}
	}

	@Nested
	@DisplayName("actualizar")
	class ActualizarTest {

		@Test
		@DisplayName("Debe lanzar excepción si la materia no existe en la escuela")
		void fallaSiMateriaNoExiste() {

			assertThrows(
					RecursoNoEncontradoException.class,
					() -> materiaService.actualizar(
							escuelaBDD.getId(),
							999L,
							"Nuevo Nombre",
							"NN",
							6
					)
			);
		}

		@Test
		@DisplayName("Debe actualizar correctamente la materia")
		void actualizaCorrectamente() {

			// Arrange
			Materia creada = materiaService.crear(
					escuelaBDD.getId(),
					new Materia("Historia", "HIS", 4)
			);

			// Act
			Materia actualizada = materiaService.actualizar(
					escuelaBDD.getId(),
					creada.getId(),
					"Historia Argentina",
					"HISA",
					6
			);

			// Assert
			assertEquals("Historia Argentina", actualizada.getNombre());
			assertEquals("HISA", actualizada.getAbreviatura());
			assertEquals(6, actualizada.getCantidadModulos());

			// Verificamos que realmente quedó persistido
			Materia desdeBD = materiaService.obtenerPorId(creada.getId());

			assertEquals("Historia Argentina", desdeBD.getNombre());
			assertEquals("HISA", desdeBD.getAbreviatura());
			assertEquals(6, desdeBD.getCantidadModulos());
		}

		@Test
		@DisplayName("Debe lanzar excepción de dominio si los datos son inválidos")
		void fallaSiDatosInvalidos() {

			Materia creada = materiaService.crear(
					escuelaBDD.getId(),
					new Materia("Geografía", "GEO", 4)
			);

			assertThrows(
					CampoObligatorioException.class,
					() -> materiaService.actualizar(
							escuelaBDD.getId(),
							creada.getId(),
							"",
							"GEO",
							4
					)
			);
		}
	}

}