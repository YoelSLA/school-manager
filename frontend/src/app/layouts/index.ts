import { matchPath, type Params } from "react-router-dom";
import { routeTitles } from "../router/titles";

/* =========================================================
   BREADCRUMB TYPES
========================================================= */

/**
 * Item individual del breadcrumb.
 *
 * - `label`: texto visible
 * - `to`: ruta opcional para navegación
 */
export type BreadcrumbItem = {
	label: string;
	to?: string;
};

/**
 * Estado opcional enviado mediante navigate(..., { state }).
 *
 * Permite:
 * - agregar breadcrumbs contextuales
 * - reemplazar labels dinámicamente
 * - ocultar breadcrumbs base
 */
export type BreadcrumbState = {
	from?: string;
	label?: string;
	skipBase?: boolean;

	/**
	 * Reemplaza labels usando IDs dinámicos.
	 *
	 * Ejemplo:
	 * {
	 *   "15": "Pérez, Juan"
	 * }
	 */
	dynamicLabels?: Record<string, string>;
};

/**
 * Resolver de breadcrumbs.
 *
 * Puede ser:
 *
 * 1. Un array estático:
 *
 * [
 *   { label: "Asistencias" }
 * ]
 *
 * 2. Una función dinámica basada en params/state:
 *
 * (params, state) => [...]
 */
export type BreadcrumbResolver =
	| BreadcrumbItem[]
	| ((
			params: Params<string>,
			state?: BreadcrumbState | null,
	  ) => BreadcrumbItem[]);

/* =========================================================
   RESOLVE BREADCRUMBS
========================================================= */

/**
 * Resuelve los breadcrumbs según el pathname actual.
 *
 * Busca coincidencias en routeTitles usando react-router matchPath.
 *
 * Soporta:
 * - rutas estáticas
 * - rutas dinámicas
 * - labels dinámicos
 * - state contextual
 */
export function resolveBreadcrumbs(
	pathname: string,
	state?: BreadcrumbState | null,
): BreadcrumbItem[] {
	for (const [pattern, resolver] of Object.entries(routeTitles)) {
		const match = matchPath(
			{
				path: pattern,
				end: true,
			},
			pathname,
		);

		// La ruta no coincide
		if (!match) continue;

		// Resolver dinámico
		if (typeof resolver === "function") {
			return resolver(match.params, state);
		}

		// Resolver estático
		return resolver;
	}

	// No hubo coincidencias
	return [];
}
