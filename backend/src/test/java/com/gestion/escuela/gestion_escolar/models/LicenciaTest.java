package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.periodo.PeriodoAbiertoException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

import static com.gestion.escuela.gestion_escolar.models.Periodo.abierto;
import static com.gestion.escuela.gestion_escolar.models.Periodo.cerrado;
import static java.time.Month.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class LicenciaTest extends DomainTestFixture {

	private TipoLicencia tipoLicencia = TipoLicencia.L_A1;
	private Periodo periodoCerrado;

	@BeforeEach
	void setUp() {
		tipoLicencia = TipoLicencia.L_A1;
		LocalDate fechaInicioLicencia =  LocalDate.of(2026, MARCH, 1);
		LocalDate fechaFinLicencia =  LocalDate.of(2026, MARCH, 10);
		periodoCerrado = cerrado(fechaInicioLicencia, fechaFinLicencia);

	}

	@Nested
	class ConstruccionBuilder {

		@Test
		void deberiaConstruirLicenciaConDatosObligatorios() {

			Licencia licencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.agregarDesignacion(direccion2467830)
					.build();

			assertThat(licencia).isNotNull();

			assertThat(licencia.getEmpleadoEducativo()).isEqualTo(giardinoNoraRosa);

			assertThat(licencia.getTipoLicencia()).isEqualTo(tipoLicencia);

			assertThat(licencia.getPeriodo()).isEqualTo(periodoCerrado);
		}

		@Test
		void deberiaConstruirLicenciaConDescripcion() {

			Licencia licencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.descripcion("Licencia médica")
					.agregarDesignacion(direccion2467830)
					.build();

			assertThat(licencia.getDescripcion()).isEqualTo("Licencia médica");
		}

		@Test
		void deberiaAgregarDesignacion() {

			Licencia licencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.agregarDesignacion(plg2467775)
					.build();

			assertThat(licencia.getDesignaciones()).containsExactly(plg2467775);
		}

		@Test
		void deberiaAgregarMultiplesDesignaciones() {

			Set<Designacion> designaciones = Set.of(plg2467775, direccion2467830);

			Licencia licencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.agregarDesignaciones(designaciones)
					.build();

			assertThat(licencia.getDesignaciones()).containsExactlyInAnyOrderElementsOf(designaciones);
		}

		@Test
		void deberiaConstruirLicenciaSinDescripcion() {
			Licencia licencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.agregarDesignacion(plg2467775)
					.build();

			assertThat(licencia.getDescripcion()).isNull();
		}

		@Test
		void deberiaLanzarExcepcionCuandoEmpleadoEducativoEsNull() {

			assertThatThrownBy(() -> Licencia.builder()
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.build())
					.isInstanceOf(CampoObligatorioException.class);
		}

		@Test
		void deberiaLanzarExcepcionCuandoPeriodoEsAbierto() {

			LocalDate fechaInicioLicencia = LocalDate.of(2026, MARCH, 1);

			assertThatThrownBy(() -> Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(abierto(fechaInicioLicencia)))
					.isInstanceOf(PeriodoAbiertoException.class)
					.hasMessage("La licencia no puede tener un período abierto.");
		}

		@Test
		void deberiaLanzarExcepcionCuandoTipoLicenciaEsNull() {

			assertThatThrownBy(() -> Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.periodo(periodoCerrado)
					.build())
					.isInstanceOf(CampoObligatorioException.class);
		}

		@Test
		void deberiaLanzarExcepcionCuandoPeriodoEsNull() {

			assertThatThrownBy(() -> Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.build())
					.isInstanceOf(CampoObligatorioException.class);
		}

		@Test
		void deberiaLanzarExcepcionCuandoNoHayDesignaciones() {

			assertThatThrownBy(() -> Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.build())
					.isInstanceOf(CampoObligatorioException.class);
		}

	}

	@Nested
	class GestionDesignaciones {

		private Licencia licencia;

		@BeforeEach
		void setUp() {

			licencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.agregarDesignacion(direccion2467830)
					.build();
		}

		@Test
		void deberiaAgregarDesignacion() {

			licencia.agregarDesignacion(direccion2467830);

			assertThat(licencia.getDesignaciones()).containsExactly(direccion2467830);
		}

		@Test
		void deberiaAgregarMultiplesDesignaciones() {

			Set<Designacion> designaciones = Set.of(direccion2467830, plg2467775);

			licencia.agregarDesignaciones(designaciones);

			assertThat(licencia.getDesignaciones()).containsExactlyInAnyOrderElementsOf(designaciones);
		}

		@Test
		void deberiaEliminarDesignacion() {

			licencia.agregarDesignacion(direccion2467830);
			licencia.eliminarDesignacion(direccion2467830);

			assertThat(licencia.getDesignaciones()).isEmpty();
		}

		@Test
		void deberiaEliminarTodasLasDesignaciones() {

			licencia.agregarDesignacion(direccion2467830);
			licencia.agregarDesignacion(plg2467775);
			licencia.eliminarDesignaciones();

			assertThat(licencia.getDesignaciones()).isEmpty();
		}

		@Test
		void deberiaRetornarConjuntoInmodificableDeDesignaciones() {

			licencia.agregarDesignacion(direccion2467830);

			assertThatThrownBy(() ->
					licencia.getDesignaciones().add(plg2467775))
					.isInstanceOf(UnsupportedOperationException.class);
		}

		@Test
		void deberiaLanzarExcepcionCuandoDesignacionEsNullAlAgregar() {

			assertThatThrownBy(() ->
					licencia.agregarDesignacion(null))
					.isInstanceOf(CampoObligatorioException.class);
		}

		@Test
		void deberiaLanzarExcepcionCuandoDesignacionesEsNull() {

			assertThatThrownBy(() ->
					licencia.agregarDesignaciones(null))
					.isInstanceOf(CampoObligatorioException.class);
		}

		@Test
		void deberiaLanzarExcepcionCuandoDesignacionesEsVacio() {

			assertThatThrownBy(() ->
					licencia.agregarDesignaciones(Set.of()))
					.isInstanceOf(CampoObligatorioException.class);
		}

		@Test
		void deberiaLanzarExcepcionCuandoDesignacionEsNullAlEliminar() {

			assertThatThrownBy(() ->
					licencia.eliminarDesignacion(null))
					.isInstanceOf(CampoObligatorioException.class);
		}
	}

	@Nested
	class VigenciaYEstado {

		private Licencia licencia;

		@BeforeEach
		void setUp() {

			licencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.agregarDesignacion(direccion2467830)
					.build();
		}

		@Test
		void deberiaEstarVigenteCuandoLaFechaEstaDentroDelPeriodo() {

			boolean vigente = licencia.estaVigenteEn(LocalDate.of(2026, MARCH, 5));

			assertThat(vigente).isTrue();
		}

		@Test
		void noDeberiaEstarVigenteCuandoLaFechaEsAnteriorAlPeriodo() {

			boolean vigente = licencia.estaVigenteEn(LocalDate.of(2026, FEBRUARY, 28));

			assertThat(vigente).isFalse();
		}

		@Test
		void noDeberiaEstarVigenteCuandoLaFechaEsPosteriorAlPeriodo() {

			boolean vigente = licencia.estaVigenteEn(LocalDate.of(2026, MARCH, 11));

			assertThat(vigente).isFalse();
		}

		@Test
		void deberiaRetornarEstadoNoVigenteCuandoLaFechaEstaFueraDelPeriodo() {

			EstadoLicencia estado = licencia.getEstadoEn(LocalDate.of(2026, APRIL, 1));

			assertThat(estado).isEqualTo(EstadoLicencia.NO_VIGENTE);
		}

		@Test
		void deberiaRetornarEstadoDescubiertaCuandoEstaVigenteYNoEstaCubierta() {

			EstadoLicencia estado = licencia.getEstadoEn(LocalDate.of(2026, MARCH, 5));

			assertThat(estado).isEqualTo(EstadoLicencia.DESCUBIERTA);
		}

		@Test
		void deberiaRetornarCantidadDeDiasDeLicencia() {

			Integer dias = licencia.dias();

			assertThat(dias).isEqualTo(10);
		}
	}

	@Nested
	class RelacionesConDesignaciones {

		private Licencia licencia;

		@BeforeEach
		void setUp() {

			LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);
			direccion2467830.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion, 1);

			licencia = giardinoNoraRosa.crearLicencia(
					tipoLicencia,
					periodoCerrado,
					null,
					Set.of(direccion2467830)
			);

		}

		@Test
		void deberiaAfectarDesignacionCuandoLaLicenciaEstaVigente() {

			boolean afecta = licencia.afectaA(direccion2467830, LocalDate.of(2026, MARCH, 5));

			assertThat(afecta).isTrue();
		}

		@Test
		void noDeberiaAfectarDesignacionCuandoLaLicenciaNoEstaVigente() {

			boolean afecta = licencia.afectaA(direccion2467830, LocalDate.of(2026, APRIL, 1));

			assertThat(afecta).isFalse();
		}

		@Test
		void noDeberiaAfectarDesignacionCuandoNoPerteneceALaLicencia() {

			boolean afecta = licencia.afectaA(plg2467775, LocalDate.of(2026, MARCH, 5));

			assertThat(afecta).isFalse();
		}

		@Test
		void deberiaRetornarSuplenciaDeDesignacion() {

			AsignacionSuplente suplente = direccion2467830.cubrirConSuplente(
					licencia,
					billordoTomasa,
					periodoCerrado.getFechaDesde(),
					1
			);

			Optional<AsignacionSuplente> resultado = licencia.suplenciaDe(direccion2467830);

			assertThat(resultado).contains(suplente);
		}

		@Test
		void deberiaRetornarOptionalVacioCuandoNoHaySuplencia() {

			Optional<AsignacionSuplente> resultado = licencia.suplenciaDe(direccion2467830);

			assertThat(resultado).isEmpty();
		}

		@Test
		void noDeberiaAfectarCuandoLaDesignacionEsNull() {

			boolean afecta = licencia.afectaA(
					null,
					LocalDate.of(2026, MARCH, 5)
			);

			assertThat(afecta).isFalse();
		}

		@Test
		void deberiaLanzarExcepcionCuandoDesignacionEsNullEnSuplenciaDe() {

			assertThatThrownBy(() ->
					licencia.suplenciaDe(null))
					.isInstanceOf(CampoObligatorioException.class);
		}
	}

	@Nested
	class Superposicion {

		private Licencia licencia;

		@BeforeEach
		void setUp() {

			licencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.agregarDesignacion(direccion2467830)
					.build();
		}

		@Test
		void deberiaSuperponerseConOtraLicencia() {

			Periodo otroPeriodo = cerrado(
					LocalDate.of(2026, MARCH, 5),
					LocalDate.of(2026, MARCH, 15)
			);

			Licencia otraLicencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(otroPeriodo)
					.agregarDesignacion(plg2467775)
					.build();

			boolean seSuperpone = licencia.seSuperponeCon(otraLicencia);

			assertThat(seSuperpone).isTrue();
		}

		@Test
		void noDeberiaSuperponerseConOtraLicencia() {

			Periodo otroPeriodo = cerrado(
					LocalDate.of(2026, APRIL, 1),
					LocalDate.of(2026, APRIL, 10)
			);

			Licencia otraLicencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(otroPeriodo)
					.agregarDesignacion(plg2467775)
					.build();

			boolean seSuperpone = licencia.seSuperponeCon(otraLicencia);

			assertThat(seSuperpone).isFalse();
		}

		@Test
		void deberiaSuperponerseConPeriodo() {

			Periodo otroPeriodo = cerrado(
					LocalDate.of(2026, MARCH, 8),
					LocalDate.of(2026, MARCH, 20)
			);

			boolean seSuperpone = licencia.seSuperponeCon(otroPeriodo);

			assertThat(seSuperpone).isTrue();
		}

		@Test
		void noDeberiaSuperponerseConPeriodo() {

			Periodo otroPeriodo = cerrado(
					LocalDate.of(2026, APRIL, 1),
					LocalDate.of(2026, APRIL, 10)
			);

			boolean seSuperpone =
					licencia.seSuperponeCon(otroPeriodo);

			assertThat(seSuperpone).isFalse();
		}

		@Test
		void deberiaSuperponerseCuandoCompartenFechaInicio() {

			Periodo otroPeriodo = cerrado(
					LocalDate.of(2026, MARCH, 1),
					LocalDate.of(2026, MARCH, 3)
			);

			assertThat(licencia.seSuperponeCon(otroPeriodo)).isTrue();
		}

		@Test
		void deberiaSuperponerseCuandoCompartenFechaFin() {

			Periodo otroPeriodo = cerrado(
					LocalDate.of(2026, MARCH, 10),
					LocalDate.of(2026, MARCH, 15)
			);

			assertThat(licencia.seSuperponeCon(otroPeriodo)).isTrue();
		}

		@Test
		void deberiaLanzarExcepcionCuandoLicenciaEsNull() {

			assertThatThrownBy(() ->
					licencia.seSuperponeCon((Licencia) null))
					.isInstanceOf(CampoObligatorioException.class);
		}

		@Test
		void deberiaLanzarExcepcionCuandoPeriodoEsNull() {

			assertThatThrownBy(() ->
					licencia.seSuperponeCon((Periodo) null))
					.isInstanceOf(CampoObligatorioException.class);
		}
	}

	@Nested
	class InfraestructuraYUtilitarios {

		private Licencia licencia;

		@BeforeEach
		void setUp() {

			licencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.descripcion("Licencia médica")
					.agregarDesignacion(direccion2467830)
					.build();
		}

		@Test
		void deberiaRetornarRepresentacionTextualDeLicencia() {

			String resultado = licencia.toString();

			assertThat(resultado).contains("Licencia");
			assertThat(resultado).contains("id");
			assertThat(resultado).contains("empleado");
			assertThat(resultado).contains("tipoLicencia");
			assertThat(resultado).contains("Licencia médica");
			assertThat(resultado).contains("periodo");
			assertThat(resultado).contains("designaciones");
		}
	}



}
