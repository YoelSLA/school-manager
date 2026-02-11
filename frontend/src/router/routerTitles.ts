import type { Params } from "react-router-dom";

type BreadcrumbItem = {
	label: string;
	to?: string;
};

type BreadcrumbResolver =
	| BreadcrumbItem[]
	| ((params: Params<string>) => BreadcrumbItem[]);

export const routeTitles: Record<string, BreadcrumbResolver> = {
	"/dashboard": [{ label: "Dashboard" }],

	/* =====================
     EMPLEADOS EDUCATIVOS
  ===================== */

	"/empleadosEducativos": [{ label: "Empleados educativos" }],

	"/empleadosEducativos/crear": [
		{ label: "Empleados educativos", to: "/empleadosEducativos" },
		{ label: "Crear personal" },
	],

	"/empleadosEducativos/:id": (params) => [
		{ label: "Empleados Educativos", to: "/empleadosEducativos" },
		{ label: `#${params.id}` },
	],

	/* =====================
     CURSOS
  ===================== */

	"/cursos": [{ label: "Cursos" }],

	"/cursos/:id": (params) => [
		{ label: "Cursos", to: "/cursos" },
		{ label: `#${params.id}` },
	],

	/* =====================
     MATERIAS
  ===================== */

	"/materias": [{ label: "Materias" }],

	/* =====================
     DESIGNACIONES
  ===================== */

	"/designaciones": [{ label: "Designaciones" }],

	"/designaciones/crear": [
		{ label: "Designaciones", to: "/designaciones" },
		{ label: "Crear asignación" },
	],

	"/designaciones/:id": (params) => [
		{ label: "Designaciones", to: "/designaciones" },
		{ label: `#${params.id}` },
	],

	/* =====================
   ASISTENCIA
===================== */

	"/asistencias": [{ label: "Asistencias" }],

	"/asistencias/:id": (params) => [
		{ label: "Asistencias", to: "/asistencias" },
		{ label: `#${params.id}` },
	],

	/* =====================
     LICENCIA
  ===================== */

	"/licencias": [{ label: "Licencias" }],

	"/licencias/crear": [
		{ label: "Licencias", to: "/licencias" },
		{ label: "Crear Licencia" },
	],

	"/licencias/:licenciaId": (params) => [
		{ label: "Licencias", to: "/licencias" },
		{ label: `#${params.licenciaId}` },
	],
};
