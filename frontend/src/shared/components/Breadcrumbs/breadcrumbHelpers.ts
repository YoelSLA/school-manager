import { matchPath } from "react-router-dom";
import { routeTitles } from "@/app/router/routeTitles";
import type { BreadcrumbItem, BreadcrumbState } from "./types";

/* =========================================================
   RESOLVE BREADCRUMBS
========================================================= */

/**
 * Resuelve los breadcrumbs según el pathname actual.
 *
 * Busca coincidencias en routeTitles utilizando
 * react-router matchPath.
 *
 * Soporta:
 *
 * - rutas estáticas
 * - rutas dinámicas
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

		// La ruta no coincide.
		if (!match) {
			continue;
		}

		// Resolver dinámico.
		if (typeof resolver === "function") {
			return resolver(match.params, state);
		}

		// Resolver estático.
		return resolver;
	}

	// No hubo coincidencias.
	return [];
}

/* =========================================================
   BUILD BREADCRUMB ITEMS
========================================================= */

/**
 * Construye los breadcrumbs finales.
 *
 * Si existe un recorrido enviado mediante state,
 * se utiliza ese recorrido completo.
 *
 * De lo contrario, se utilizan los breadcrumbs
 * definidos para la ruta actual.
 */
export function buildBreadcrumbItems(
	baseItems: BreadcrumbItem[],
	state: BreadcrumbState | null,
): BreadcrumbItem[] {
	if (state?.breadcrumbs?.length) {
		return state.breadcrumbs;
	}

	return baseItems;
}
