import type { RolEducativo } from "@/shared/types";

export const asistenciaQueryKeys = {
	all: ["asistencias"] as const,

	rolesConAsistencias: (escuelaId: number, fecha: string) =>
		[...asistenciaQueryKeys.all, "escuela", escuelaId, "roles", fecha] as const,

	porEmpleadoMes: (
		escuelaId: number,
		empleadoId: number,
		anio: number,
		mes: number,
	) =>
		[
			...asistenciaQueryKeys.all,
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
			...asistenciaQueryKeys.all,
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
