package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
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
	private Asignacion titular;

	@BeforeEach
	void setUp() {
		tipoLicencia = TipoLicencia.L_A1;
		LocalDate fechaInicioLicencia =  LocalDate.of(2026, MARCH, 1);
		LocalDate fechaFinLicencia =  LocalDate.of(2026, MARCH, 10);
		periodoCerrado = cerrado(fechaInicioLicencia, fechaFinLicencia);

		LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);
		titular = plg2467775.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion, 1);

	}

	@Nested
	class ConstruccionBuilder {

		@Test
		void deberiaConstruirLicenciaConDatosObligatorios() {

			Licencia licencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.agregarAsignacion(titular)
					.build();

			assertThat(licencia).isNotNull();
			assertThat(licencia.getEmpleadoEducativo()).isEqualTo(giardinoNoraRosa);
			assertThat(licencia.getTipoLicencia()).isEqualTo(tipoLicencia);
			assertThat(licencia.getPeriodo()).isEqualTo(periodoCerrado);
			assertThat(licencia.getAsignaciones()).contains(titular);
		}

		@Test
		void deberiaConstruirLicenciaConDescripcion() {

			Licencia licencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.descripcion("Licencia médica")
					.agregarAsignacion(titular)
					.build();

			assertThat(licencia.getDescripcion()).isEqualTo("Licencia médica");
		}

		@Test
		void deberiaAgregarDesignacion() {

			Licencia licencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.agregarAsignacion(titular)
					.build();

			assertThat(licencia.getAsignaciones()).containsExactly(titular);
		}

		@Test
		void deberiaAgregarMultiplesDesignaciones() {

			Set<Asignacion> asignaciones = Set.of(titular);

			Licencia licencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.agregarAsignaciones(asignaciones)
					.build();

			assertThat(licencia.getAsignaciones()).containsExactlyInAnyOrderElementsOf(asignaciones);
		}

		@Test
		void deberiaConstruirLicenciaSinDescripcion() {
			Licencia licencia = Licencia.builder()
					.empleadoEducativo(giardinoNoraRosa)
					.tipoLicencia(tipoLicencia)
					.periodo(periodoCerrado)
					.agregarAsignacion(titular)
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
					.agregarAsignacion(titular)
					.build();
		}

		@Test
		void deberiaAgregarDesignacion() {

			licencia.agregarAsignacion(direccion2467830);

			assertThat(licencia.getAsignaciones()).containsExactly(direccion2467830);
		}

		@Test
		void deberiaAgregarMultiplesDesignaciones() {

			Set<Designacion> designaciones = Set.of(direccion2467830, plg2467775);

			licencia.agregarAsignaciones(designaciones);

			assertThat(licencia.getAsignaciones()).containsExactlyInAnyOrderElementsOf(designaciones);
		}

		@Test
		void deberiaEliminarDesignacion() {

			licencia.agregarAsignacion(direccion2467830);
			licencia.eliminarAsignacion(direccion2467830);

			assertThat(licencia.getAsignaciones()).isEmpty();
		}

		@Test
		void deberiaEliminarTodasLasDesignaciones() {

			licencia.agregarAsignacion(direccion2467830);
			licencia.agregarAsignacion(plg2467775);
			licencia.eliminarAsignaciones();

			assertThat(licencia.getAsignaciones()).isEmpty();
		}

		@Test
		void deberiaRetornarConjuntoInmodificableDeDesignaciones() {

			licencia.agregarAsignacion(direccion2467830);

			assertThatThrownBy(() ->
					licencia.getAsignaciones().add(plg2467775))
					.isInstanceOf(UnsupportedOperationException.class);
		}

		@Test
		void deberiaLanzarExcepcionCuandoDesignacionEsNullAlAgregar() {

			assertThatThrownBy(() ->
					licencia.agregarAsignacion(null))
					.isInstanceOf(CampoObligatorioException.class);
		}

		@Test
		void deberiaLanzarExcepcionCuandoDesignacionesEsNull() {

			assertThatThrownBy(() ->
					licencia.agregarAsignaciones(null))
					.isInstanceOf(CampoObligatorioException.class);
		}

		@Test
		void deberiaLanzarExcepcionCuandoDesignacionesEsVacio() {

			assertThatThrownBy(() ->
					licencia.agregarAsignaciones(Set.of()))
					.isInstanceOf(CampoObligatorioException.class);
		}

		@Test
		void deberiaLanzarExcepcionCuandoDesignacionEsNullAlEliminar() {

			assertThatThrownBy(() ->
					licencia.eliminarAsignacion(null))
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
					.agregarAsignacion(titular)
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
		private AsignacionTitular direccionTitular;

		@BeforeEach
		void setUp() {

			LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);
			direccionTitular = direccion2467830.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion, 1);

			licencia = giardinoNoraRosa.crearLicencia(
					tipoLicencia,
					periodoCerrado,
					null,
					Set.of(direccion2467830)
			);

		}

		@Test
		void deberiaAfectarDesignacionCuandoLaLicenciaEstaVigente() {

			boolean afecta = licencia.afectaA(direccionTitular, LocalDate.of(2026, MARCH, 5));

			assertThat(afecta).isTrue();
		}

		@Test
		void noDeberiaAfectarDesignacionCuandoLaLicenciaNoEstaVigente() {

			boolean afecta = licencia.afectaA(direccionTitular, LocalDate.of(2026, APRIL, 1));

			assertThat(afecta).isFalse();
		}

		@Test
		void noDeberiaAfectarDesignacionCuandoNoPerteneceALaLicencia() {

			boolean afecta = licencia.afectaA(direccionTitular, LocalDate.of(2026, MARCH, 5));

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

			Optional<AsignacionSuplente> resultado = licencia.suplenciaDe(direccionTitular);

			assertThat(resultado).contains(suplente);
		}

		@Test
		void deberiaRetornarOptionalVacioCuandoNoHaySuplencia() {

			Optional<AsignacionSuplente> resultado = licencia.suplenciaDe(direccionTitular);

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
					.agregarAsignacion(titular)
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
					.agregarAsignacion(titular)
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
					.agregarAsignacion(titular)
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
					.agregarAsignacion(titular)
					.build();
		}

		@Test
		void deberiaIncluirLosDatosPrincipalesEnToString() {
			assertThat(licencia.toString())
					.contains("Licencia{")
					.contains("empleadoId=")
					.contains("codigoLicencia=L_A1")
					.contains("descripcion='Licencia médica'")
					.contains("periodo=2026-03-01 → 2026-03-10")
					.contains("licenciaAnteriorId=")
					.contains("licenciaSiguienteId=")
					.contains("designacionesIds=");
		}
	}



}
