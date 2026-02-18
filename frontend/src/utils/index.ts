import { matchPath } from "react-router-dom";
import type { TipoLicencia } from "@/features/licencias/utils/tipoLicencia";
import type {
	DesignacionFiltro,
	RolEducativo,
} from "@/features/designaciones/types/designacion.types";
import { routeTitles } from "@/router/titles";

export function diasRestantes(fechaHasta: string): number {
	const [year, month, day] = fechaHasta.split("-").map(Number);

	const hoy = new Date();
	const hasta = new Date(year, month - 1, day);

	hoy.setHours(0, 0, 0, 0);
	hasta.setHours(0, 0, 0, 0);

	const diff = hasta.getTime() - hoy.getTime();
	return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

export function formatearHora(hora: string) {
	const [hh, mm] = hora.split(":");
	return `${hh}:${mm}`;
}

export function resolveBreadcrumbs(pathname: string) {
	for (const route in routeTitles) {
		const match = matchPath(route, pathname);
		if (match) {
			const resolver = routeTitles[route];
			return typeof resolver === "function" ? resolver(match.params) : resolver;
		}
	}

	return null;
}

export function formatearFecha(fechaISO: string): string {
	const [y, m, d] = fechaISO.split("-");
	const meses = [
		"ene",
		"feb",
		"mar",
		"abr",
		"may",
		"jun",
		"jul",
		"ago",
		"sep",
		"oct",
		"nov",
		"dic",
	];

	return `${d} ${meses[Number(m) - 1]} ${y.slice(2)}`;
}

export function formatPeriodo(desde: string, hasta: string) {
	const fmt = (f: string) =>
		new Date(f).toLocaleDateString("es-AR", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});

	return `${fmt(desde)} ➡️ ${fmt(hasta)}`;
}

export function agruparPorArticulo(tipos: TipoLicencia[]) {
	return tipos.reduce<Record<string, TipoLicencia[]>>((acc, tipo) => {
		acc[tipo.articulo] ??= [];
		acc[tipo.articulo].push(tipo);
		return acc;
	}, {});
}

export const NAV_ITEMS = [
	{ label: "Dashboard", to: "/dashboard" },
	{ label: "Empleados Educativos", to: "/empleadosEducativos" },
	{ label: "Asistencias", to: "/asistencias" },
	{ label: "Licencias", to: "/licencias" },
	{ label: "Designaciones", to: "/designaciones" },
	{ label: "Materias", to: "/materias" },
	{ label: "Cursos", to: "/cursos" },
];

export const FILTROS_DESIGNACIONES: {
	value: DesignacionFiltro;
	label: string;
}[] = [
	{ value: "ADMIN", label: "Administrativas" },
	{ value: "CURSO", label: "Cursos" },
];

export function formatLicenciaLabel(codigo: string, descripcion: string) {
	return `${codigo.padEnd(6, " ")} — ${descripcion}`;
}

export const ROL_EDUCATIVO_LABELS: Record<RolEducativo, string> = {
	DIRECCION: "Dirección",
	VICEDIRECCION: "Vicedirección",
	SECRETARIA: "Secretaría",
	ORIENTACION_EDUCACIONAL: "Orientación Educacional",
	ORIENTACION_SOCIAL: "Orientación Social",
	BIBLIOTECARIO: "Bibliotecario",
	PRECEPTORIA: "Preceptoría",
	DOCENTE: "Docente",
	AUXILIAR: "Auxiliar",
	ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL:
		"Encargado de Medio de Apoyo Técnico Profesional",
};

const ARG_TZ = "America/Argentina/Buenos_Aires";

/**
 * Crea una fecha interpretando YYYY-MM-DD como fecha LOCAL (Argentina)
 */
export function createArgentinaDate(fecha: string): Date | null {
	if (!fecha) return null;

	const parts = fecha.split("-");
	if (parts.length !== 3) return null;

	const [year, month, day] = parts.map(Number);

	if (!year || !month || !day) return null;

	// 👇 se crea en horario local (NO UTC)
	return new Date(year, month - 1, day);
}

/**
 * Formatter fijo Argentina
 */
export const argentinaDateFormatter = new Intl.DateTimeFormat("es-AR", {
	timeZone: ARG_TZ,
	day: "2-digit",
	month: "long",
	year: "numeric",
});

export function formatFechaIngreso(fecha?: string | null): {
	texto: string;
	tieneFecha: boolean;
} {
	if (!fecha) {
		return { texto: "Sin fecha", tieneFecha: false };
	}

	const date = createArgentinaDate(fecha);

	if (!date) {
		return { texto: "Sin fecha", tieneFecha: false };
	}

	return {
		texto: argentinaDateFormatter.format(date),
		tieneFecha: true,
	};
}

/**
 * Devuelve la fecha actual en Argentina en formato YYYY-MM-DD
 */
export function getTodayArgentinaISO(): string {
	const now = new Date();

	const formatter = new Intl.DateTimeFormat("en-CA", {
		timeZone: ARG_TZ,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});

	return formatter.format(now);
}
