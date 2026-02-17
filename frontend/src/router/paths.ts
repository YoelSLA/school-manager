/* ======================================================
   DASHBOARD
====================================================== */

export const dashboardPaths = {
	base: "/dashboard",
};

/* ======================================================
   EMPLEADOS EDUCATIVOS
====================================================== */

export const empleadosEducativosPaths = {
	base: "/empleadosEducativos",

	create: "/empleadosEducativos/crear",

	detail: (empleadoId: number | string) => `/empleadosEducativos/${empleadoId}`,

	edit: (empleadoId: number | string) =>
		`/empleadosEducativos/${empleadoId}/editar`,
};

/* ======================================================
   ASISTENCIAS
====================================================== */

export const asistenciasPaths = {
	base: "/asistencias",

	detail: (empleadoId: number | string) => `/asistencias/${empleadoId}`,
};

/* ======================================================
   CURSOS
====================================================== */

export const cursosPaths = {
	base: "/cursos",

	detail: (cursoId: number | string) => `/cursos/${cursoId}`,
};

/* ======================================================
   MATERIAS
====================================================== */

export const materiasPaths = {
	base: "/materias",
};

/* ======================================================
   DESIGNACIONES
====================================================== */

export const designacionesPaths = {
	base: "/designaciones",

	create: "/designaciones/crear",

	detail: (designacionId: number | string) => `/designaciones/${designacionId}`,
};

/* ======================================================
   LICENCIAS
====================================================== */

export const licenciasPaths = {
	base: "/licencias",

	create: "/licencias/crear",

	detail: (licenciaId: number | string) => `/licencias/${licenciaId}`,
};
