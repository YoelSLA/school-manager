export const asistenciasQueryKeys = {
	all: ["asistencias"] as const,

	rolesConAsistencias: (fecha: string) =>
		[...asistenciasQueryKeys.all, "roles", fecha] as const,

	porEmpleadoMes: (
		escuelaId: number,
		empleadoId: number,
		anio: number,
		mes: number,
	) =>
		[
			...asistenciasQueryKeys.all,
			"escuela",
			escuelaId,
			"empleado",
			empleadoId,
			anio,
			mes,
		] as const,

	empleadosPorFecha: (fecha: string, roles: string[], query: string) =>
		[
			...asistenciasQueryKeys.all,
			"empleados",
			fecha,
			[...roles].sort(),
			query,
		] as const,
};
