import type { RolEducativo } from "../../types";

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
			"mes",
			anio,
			mes,
		] as const,

	empleados: (
		escuelaId: number,
		fecha: string,
		roles: RolEducativo[] = [],
		q: string = "",
		page: number = 0,
		size: number = 10,
	) =>
		[
			...asistenciasQueryKeys.all,
			"escuela",
			escuelaId,
			"empleados",
			fecha,
			[...roles].sort(),
			q,
			page,
			size,
		] as const,
};
