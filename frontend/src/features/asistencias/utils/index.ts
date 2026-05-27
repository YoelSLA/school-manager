import type { AsistenciaDiaDTO } from "@/shared/utils/types";

export type EstadoVisual = "presente" | "ausente" | null;

// --------------------------------------------------------------------------------------------
export function getCodigoAsistencia(asistencia?: AsistenciaDiaDTO) {
	if (!asistencia) {
		return null;
	}

	if (asistencia.estadoAsistencia === "PRESENTE") {
		return "PRESENTE";
	}

	return asistencia.tipoLicencia ?? "A";
}
// --------------------------------------------------------------------------------------------
export function getEstadoVisual(asistencia?: AsistenciaDiaDTO): EstadoVisual {
	if (!asistencia) {
		return null;
	}

	switch (asistencia.estadoAsistencia) {
		case "PRESENTE":
			return "presente";

		case "AUSENTE":
			return "ausente";

		default:
			return null;
	}
}
// --------------------------------------------------------------------------------------------
export function getCodigoAusencia(asistencia: AsistenciaDiaDTO): string {
	if (asistencia.origenAsistencia === "LICENCIA") {
		return asistencia.licencia?.normativa.codigo ?? "SIN_CODIGO";
	}
	return asistencia.tipoLicencia ?? "SIN_CODIGO";
}
// --------------------------------------------------------------------------------------------
export function useAsistenciaStats(asistencias: AsistenciaDiaDTO[]) {
	const diasEsperados = asistencias.length;

	const presentes = asistencias.filter(
		(a) => a.estadoAsistencia === "PRESENTE",
	);

	const ausentes = asistencias.filter((a) => a.estadoAsistencia === "AUSENTE");

	const cantidadPresentes = presentes.length;

	const cantidadAusentes = ausentes.length;

	const porcentajePresentes =
		diasEsperados > 0 ? (cantidadPresentes / diasEsperados) * 100 : 0;

	const ausentesPorCodigo = ausentes.reduce<Record<string, number>>(
		(acc, asistencia) => {
			const codigo = getCodigoAusencia(asistencia);

			acc[codigo] = (acc[codigo] ?? 0) + 1;

			return acc;
		},
		{},
	);

	return {
		diasEsperados,
		cantidadPresentes,
		cantidadAusentes,
		porcentajePresentes,
		ausentesPorCodigo,
	};
}
// --------------------------------------------------------------------------------------------
export function toDateString(date: Date) {
	return date.toISOString().split("T")[0];
}
// --------------------------------------------------------------------------------------------
