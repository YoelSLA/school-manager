export const asistenciaPaths = {
	base: "/asistencias",

	list: "/asistencias",

	detail: (empleadoId: number | string, anio: number, mes: number) =>
		`/asistencias/${empleadoId}/${anio}/${mes}`,

	month: (empleadoId: number | string, anio: number, mes: number) =>
		`/asistencias/${empleadoId}/${anio}/${mes}`,
};
