package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.exceptions.*;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionNoAfectadaPorLicenciaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionNoVacantePorLicenciaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionYaCubiertaException;

import java.time.LocalDate;

public class PoliticaDeCobertura {

	public static void validarCubrirConTitular(Designacion designacion,
											   EmpleadoEducativo empleado,
											   LocalDate fechaDesde
	) {

		Validaciones.noNulo(empleado, "empleado");
		Validaciones.noNulo(fechaDesde, "fecha desde");
		validarPuedeTomarPosesionEn(empleado, fechaDesde);

		if (designacion.tieneTitularActivo(fechaDesde)) {
			throw new DesignacionYaTieneTitularException(designacion);
		}

	}

	public static void validarCubrirConProvisionalAutomatico(Designacion designacion,
															 EmpleadoEducativo empleadoEducativo,
															 LocalDate fechaInicio,
															 Periodo periodo) {

		Validaciones.noNulo(empleadoEducativo, "empleado educativo");
		Validaciones.noNulo(fechaInicio, "fecha inicio");
		validarCubrirConProvisional(designacion, empleadoEducativo, periodo);
		validarPuedeTomarPosesionEn(empleadoEducativo, periodo.getFechaDesde());

	}

	public static void validarCubrirConProvisionalManual(Designacion designacion,
														 EmpleadoEducativo empleadoEducativo,
														 Periodo periodo) {

		Validaciones.noNulo(empleadoEducativo, "empleado educativo");
		Validaciones.noNulo(periodo, "periodo");
		Validaciones.noNulo(periodo.getFechaDesde(), "fecha desde");
		Validaciones.noNulo(periodo.getFechaHasta(), "fecha hasta");
		validarCubrirConProvisional(designacion, empleadoEducativo, periodo);

	}

	public static void validarCubrirConSuplente(
			Designacion designacion,
			Licencia licencia,
			EmpleadoEducativo suplente,
			LocalDate fechaInicio
	) {

		Validaciones.noNulo(licencia, "licencia");
		Validaciones.noNulo(suplente, "empleado educativo");
		Validaciones.noNulo(fechaInicio, "fecha inicio");

		validarPuedeTomarPosesionEn(suplente, fechaInicio);

		if (!licencia.afectaA(designacion, fechaInicio)) {
			throw new DesignacionNoAfectadaPorLicenciaException(designacion.getId(), licencia.getId());
		}

		licencia.validarFechaValidaParaCobertura(fechaInicio);

		assert designacion != null;

		if (!designacion.tieneVacantePorLicenciaEn(fechaInicio)) {
			throw new DesignacionNoVacantePorLicenciaException(designacion.getId());
		}

		if (designacion.estaCubiertaEn(fechaInicio)) {
			throw new DesignacionYaCubiertaException(designacion);
		}
	}

	private static void validarPuedeTomarPosesionEn(EmpleadoEducativo empleadoEducativo, LocalDate fecha
	) {
		if (fecha == null) {
			throw new CampoObligatorioException("fecha de toma de posesión");
		}

		if (!empleadoEducativo.isActivo()) {
			throw new EmpleadoInactivoException(empleadoEducativo);
		}

		if (empleadoEducativo.licenciaActivaEn(fecha).isPresent()) {
			throw new EmpleadoEnLicenciaException(empleadoEducativo.getId(), fecha);
		}
	}

	private static void validarCubrirConProvisional(
			Designacion designacion,
			EmpleadoEducativo empleado,
			Periodo periodo
	) {

		Validaciones.noNulo(empleado, "empleado educativo");
		Validaciones.noNulo(periodo, "periodo");

		if (designacion.tieneAsignacionQueSeSuperponeCon(periodo)) {
			throw new DesignacionYaCubiertaException(designacion);
		}
	}


}
