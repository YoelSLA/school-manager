import type { Params } from "react-router-dom";

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
 * Estado utilizado para conservar el recorrido
 * contextual de los breadcrumbs.
 *
 * Ejemplo:
 *
 * {
 *   breadcrumbs: [
 *     {
 *       label: "Licencias",
 *       to: "/licencias"
 *     },
 *     {
 *       label: "#57",
 *       to: "/licencias/57"
 *     },
 *     {
 *       label: "Rodriguez, Marcela"
 *     }
 *   ]
 * }
 */
export type BreadcrumbState = {
	breadcrumbs?: BreadcrumbItem[];
};

/**
 * Resolver de breadcrumbs.
 *
 * Puede ser:
 *
 * 1. Un array estático.
 *
 * 2. Una función dinámica basada en params/state.
 */
export type BreadcrumbResolver =
	| BreadcrumbItem[]
	| ((
			params: Params<string>,
			state?: BreadcrumbState | null,
	  ) => BreadcrumbItem[]);
