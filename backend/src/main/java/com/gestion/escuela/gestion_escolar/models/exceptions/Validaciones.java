package com.gestion.escuela.gestion_escolar.models.exceptions;

import java.util.Collection;

public final class Validaciones {

	private static final String EMAIL_REGEX =
			"^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";

	private static final String CUIL_REGEX = "^(\\d{2}-\\d{8}-\\d{1}|\\d{11})$";

	private Validaciones() {
	}

	public static void noNulo(Object valor, String campo) {
		if (valor == null) {
			throw new CampoObligatorioException(campo);
		}
	}

	public static void noVacio(Collection<?> coleccion, String campo) {
		if (coleccion == null || coleccion.isEmpty()) {
			throw new IllegalArgumentException("Debe indicar al menos una " + campo);
		}
	}

	public static void noBlank(String valor, String campo) {
		noNulo(valor, campo);

		if (valor.isBlank()) {
			throw new CampoObligatorioException(campo);
		}
	}

	public static void emailValido(String email) {
		noBlank(email, "email");

		if (!email.matches(EMAIL_REGEX)) {
			throw new EmailInvalidoException(email);
		}
	}

	public static void cuilValido(String cuil) {
		noBlank(cuil, "cuil");

		if (!cuil.matches(CUIL_REGEX)) {
			throw new CuilInvalidoException(cuil);
		}
	}
}