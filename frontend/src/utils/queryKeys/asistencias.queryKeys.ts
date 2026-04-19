export const asistenciasQueryKeys = {
	all: ["asistencias"] as const,

	rolesConAsistencias: (escuelaId: number, fecha: string) =>
		[
			...asistenciasQueryKeys.all,
			"escuela",
			escuelaId,
			"roles",
			fecha,
		] as const,

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

	empleadosPorFecha: (
		escuelaId: number,
		fecha: string,
		roles: string[],
		query: string,
		page: number,
		size: number,
	) =>
		[
			...asistenciasQueryKeys.all,
			"escuela",
			escuelaId,
			"empleados",
			fecha,
			[...roles].sort(),
			query,
			page,
			size,
		] as const,
};
