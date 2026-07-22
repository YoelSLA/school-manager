package com.gestion.escuela.gestion_escolar.services;

import static com.gestion.escuela.gestion_escolar.models.enums.Turno.MANIANA;
import static com.gestion.escuela.gestion_escolar.models.enums.Turno.TARDE;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoDuplicadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import com.gestion.escuela.gestion_escolar.services.curso.CursoService;
import com.gestion.escuela.gestion_escolar.services.escuela.EscuelaService;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

class CursoServiceTest extends DomainServiceFixtureTest {

  @Autowired private EscuelaService escuelaService;

  @Autowired private CursoService cursoService;

  private Escuela escuelaN65P;

  @BeforeEach
  void setUp() {
    escuelaN65P = escuelaService.crear(escuelaN65M);
  }

  @Nested
  @DisplayName("Creación de curso")
  class CrearCurso {
    Curso p_a1g2;

    @BeforeEach
    void setUp() {
      p_a1g2 = cursoService.crear(escuelaN65P.getId(), a1g2M);
    }

    @Test
    @DisplayName("Debe crear un curso correctamente.")
    void crearCursoCorrectamente() {
      // Arrange
      Curso m_a6g1 = new Curso(TARDE, 6, 1);
      // Act
      Curso p_a6g1 = cursoService.crear(escuelaN65P.getId(), m_a6g1);
      // Assert
      assertThat(p_a6g1.getId()).isNotNull();
      assertThat(p_a6g1.getTurno()).isEqualTo(TARDE);
      assertThat(p_a6g1.getAnio()).isEqualTo(6);
      assertThat(p_a6g1.getGrado()).isEqualTo(1);
      assertThat(p_a6g1.getEscuela()).isEqualTo(escuelaN65P);
    }

    @Test
    @DisplayName(
        "Debe lanzar excepción si ya existe un curso con el año, grado y turno en la escuela.")
    void fallaSiMateriaDuplicadaEnLaMismaEscuela() {
      // Arrange
      Curso m_a1g2Duplicado = new Curso(p_a1g2.getTurno(), p_a1g2.getAnio(), p_a1g2.getGrado());

      // Act + Assert
      assertThatThrownBy(() -> cursoService.crear(escuelaN65P.getId(), m_a1g2Duplicado))
          .isInstanceOf(RecursoDuplicadoException.class);
    }
  }

  @Nested
  @DisplayName("Crear batch de curso")
  class CrearBatchTest {

    @Test
    @DisplayName("No debe hacer nada si la lista es null")
    void noHaceNadaSiListaEsNull() {
      // Arrange
      cursoService.crearBatch(escuelaN65P.getId(), null);
      // Act
      List<Curso> cursos = cursoService.listarCursosPorEscuela(escuelaN65P.getId());
      // Assert
      assertThat(cursos).isEmpty();
    }

    @Test
    @DisplayName("No debe hacer nada si la lista está vacía")
    void noHaceNadaSiListaVacia() {
      // Arrange
      cursoService.crearBatch(escuelaN65P.getId(), List.of());
      // Act
      List<Curso> cursos = cursoService.listarCursosPorEscuela(escuelaN65P.getId());
      // Assert
      assertThat(cursos).isEmpty();
    }

    @Test
    @DisplayName("Debe lanzar excepción si la escuela no existe.")
    void fallaSiEscuelaNoExiste() {
      // Act + Assert
      assertThatThrownBy(() -> cursoService.crearBatch(999L, List.of(mock(Curso.class))))
          .isInstanceOf(RecursoNoEncontradoException.class);
    }

    @Test
    @DisplayName("Debe lanzar excepción si algun curso ya existe en la escuela.")
    void fallaSiAlgunaMateriaEsDuplicada() {
      // Arrange
      Curso m_a1g1 = new Curso(MANIANA, 1, 1);
      Curso m_a1g2 = new Curso(MANIANA, 1, 2);

      cursoService.crear(escuelaN65P.getId(), m_a1g1);

      List<Curso> nuevas = List.of(m_a1g1, m_a1g2);

      // Act + Assert
      assertThatThrownBy(() -> cursoService.crearBatch(escuelaN65P.getId(), nuevas))
          .isInstanceOf(RecursoDuplicadoException.class);
    }

    @Test
    @DisplayName("Debe crear todos los curso correctamente")
    void creaTodasLasMateriasCorrectamente() {
      // Arrange
      Curso m_a1g1 = new Curso(MANIANA, 1, 1);
      Curso m_a1g2 = new Curso(MANIANA, 1, 2);
      List<Curso> ms_cursos = List.of(m_a1g1, m_a1g2);

      // Act
      cursoService.crearBatch(escuelaN65P.getId(), ms_cursos);

      // Assert
      List<Curso> ps_cursos = cursoService.listarCursosPorEscuela(escuelaN65P.getId());
      assertThat(ps_cursos).hasSize(2);
    }
  }

  @Nested
  @DisplayName("Obtener curso por ID")
  class ObtenerPorIdTest {

    @Test
    @DisplayName("Debe devolver el curso cuando existe")
    void devuelveMateriaSiExiste() {
      // Arrange
      Curso m_a1g1 = new Curso(MANIANA, 1, 1);
      Curso p_a1g1 = cursoService.crear(escuelaN65P.getId(), m_a1g1);

      // Act
      Curso p_a1g1Encontrado = cursoService.obtenerPorId(p_a1g1.getId());

      // Assert
      assertThat(p_a1g1Encontrado.getId()).isEqualTo(p_a1g1.getId());
      assertThat(p_a1g1Encontrado.getTurno()).isEqualTo(MANIANA);
      assertThat(p_a1g1Encontrado.getAnio()).isEqualTo(1);
      assertThat(p_a1g1Encontrado.getGrado()).isEqualTo(1);
    }

    @Test
    @DisplayName("Debe lanzar excepción cuando el curso no existe.")
    void fallaSiNoExiste() {
      // Act + Assert
      assertThatThrownBy(() -> cursoService.obtenerPorId(99L))
          .isInstanceOf(RecursoNoEncontradoException.class);
    }
  }

  @Nested
  @DisplayName("Listar curso paginados por escuela.")
  class ListarCursosPorEscuelaTest {

    @Test
    @DisplayName("Debe lanzar excepción si la escuela no existe")
    void fallaSiEscuelaNoExiste() {
      // Arrange
      Pageable pageable = PageRequest.of(0, 10);

      // Act + Assert
      assertThatThrownBy(() -> cursoService.listarCursosPorEscuela(99L, MANIANA, pageable))
          .isInstanceOf(RecursoNoEncontradoException.class);
    }

    @Test
    @DisplayName("Debe listar curso ordenados por turno, año y grado ascendente")
    void listaOrdenadoPorNombreAsc() {
      // Arrange
      Curso m_a1g1 = new Curso(MANIANA, 1, 1);
      Curso m_a2g1 = new Curso(MANIANA, 2, 1);
      Curso m_a3g1 = new Curso(MANIANA, 3, 1);

      cursoService.crearBatch(escuelaN65P.getId(), List.of(m_a1g1, m_a2g1, m_a3g1));
      Pageable pageable = PageRequest.of(0, 10);

      // Act
      Page<Curso> pagina =
          cursoService.listarCursosPorEscuela(escuelaN65P.getId(), MANIANA, pageable);

      // Assert
      List<Curso> cursos = pagina.getContent();
      assertEquals(3, cursos.size());
      assertEquals("1° 1", cursos.get(0).anioDivision());
      assertEquals("2° 1", cursos.get(1).anioDivision());
      assertEquals("3° 1", cursos.get(2).anioDivision());
    }

    @Test
    @DisplayName("Debe respetar la paginación")
    void respetaLaPaginacion() {
      // Arrange
      Curso m_a1g1 = new Curso(MANIANA, 1, 1);
      Curso m_a2g1 = new Curso(MANIANA, 2, 1);
      Curso m_a3g1 = new Curso(MANIANA, 3, 1);

      cursoService.crearBatch(escuelaN65P.getId(), List.of(m_a1g1, m_a2g1, m_a3g1));

      Pageable pageable = PageRequest.of(0, 2);

      // Act
      Page<Curso> pagina =
          cursoService.listarCursosPorEscuela(escuelaN65P.getId(), MANIANA, pageable);

      // Assert
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
      // Act + Assert
      assertThatThrownBy(() -> cursoService.eliminar(99L, 1L))
          .isInstanceOf(RecursoNoEncontradoException.class);
    }

    @Test
    @DisplayName("Debe lanzar excepción si el curso no existe en la escuela")
    void fallaSiMateriaNoExiste() {
      // Act + Assert
      assertThatThrownBy(() -> cursoService.eliminar(escuelaN65P.getId(), 99L))
          .isInstanceOf(RecursoNoEncontradoException.class);
    }

    @Test
    @DisplayName("Debe eliminar el curso correctamente")
    void eliminaMateriaCorrectamente() {
      // Arrange
      Curso m_a1g1 = new Curso(MANIANA, 1, 1);
      Curso p_a1g1 = cursoService.crear(escuelaN65P.getId(), m_a1g1);

      // Act
      cursoService.eliminar(escuelaN65P.getId(), p_a1g1.getId());

      // Assert
      assertThatThrownBy(() -> cursoService.obtenerPorId(p_a1g1.getId()))
          .isInstanceOf(RecursoNoEncontradoException.class);
    }

    @Test
    @DisplayName("Debe lanzar excepción de dominio si el curso pertenece a otra escuela")
    void fallaSiMateriaPerteneceAOtraEscuela() {

      Escuela m_escuelaTest = new Escuela("test", "test", "test", "11421303");
      Escuela p_escuelaTest = escuelaService.crear(m_escuelaTest);
      Curso m_a1g1 = new Curso(MANIANA, 1, 1);
      Curso p_a1g1 = cursoService.crear(escuelaN65P.getId(), m_a1g1);

      // Act + Assert
      assertThatThrownBy(() -> cursoService.eliminar(p_escuelaTest.getId(), p_a1g1.getId()))
          .isInstanceOf(RecursoNoEncontradoException.class);
    }
  }

  @Nested
  @DisplayName("actualizar")
  class ActualizarTest {

    @Test
    @DisplayName("Debe lanzar excepción si el curso no existe en la escuela.")
    void fallaSiMateriaNoExiste() {
      // Act + Assert
      assertThatThrownBy(() -> cursoService.actualizar(escuelaN65P.getId(), 99L, 1, 1, TARDE))
          .isInstanceOf(RecursoNoEncontradoException.class);
    }

    @Test
    @DisplayName("Debe actualizar correctamente el curso")
    void actualizaCorrectamente() {
      // Arrange
      Curso m_a1g1 = new Curso(MANIANA, 1, 1);
      Curso p_a1g1 = cursoService.crear(escuelaN65P.getId(), m_a1g1);

      // Act
      Curso p_a1g1Actualizado =
          cursoService.actualizar(escuelaN65P.getId(), p_a1g1.getId(), 2, 2, TARDE);

      // Assert
      assertThat(p_a1g1Actualizado.getAnio()).isEqualTo(2);
      assertThat(p_a1g1Actualizado.getGrado()).isEqualTo(2);
      assertThat(p_a1g1Actualizado.anioDivision()).isEqualTo("2° 2");
      assertThat(p_a1g1Actualizado.getTurno()).isEqualTo(TARDE);
    }

    @Test
    @DisplayName("Debe lanzar excepción de dominio si los datos son inválidos")
    void fallaSiDatosInvalidos() {
      // Arrange
      Curso m_a1g1 = new Curso(MANIANA, 1, 1);
      Curso p_a1g1 = cursoService.crear(escuelaN65P.getId(), m_a1g1);

      // Act + Assert
      assertThatThrownBy(
              () -> cursoService.actualizar(escuelaN65P.getId(), p_a1g1.getId(), null, 1, TARDE))
          .isInstanceOf(CampoObligatorioException.class);
    }
  }
}
