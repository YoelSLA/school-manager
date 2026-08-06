import type { SortState } from "@/shared/types";
import type { EmpleadoEducativoFiltro } from "../types";

export const empleadoEducativoQueryKeys = {
	all: ["empleadoEducativo"] as const,

	lists: () => [...empleadoEducativoQueryKeys.all, "list"] as const,

	detail: (empleadoId?: number) =>
		[...empleadoEducativoQueryKeys.all, "detail", empleadoId] as const,

	asignaciones: (empleadoId: number) =>
		[...empleadoEducativoQueryKeys.detail(empleadoId), "asignaciones"] as const,

	licencias: (empleadoId: number) =>
		[...empleadoEducativoQueryKeys.detail(empleadoId), "licencias"] as const,

	asignacionesActivas: (empleadoId: number) =>
		[
			...empleadoEducativoQueryKeys.detail(empleadoId),
			"asignaciones-activas",
		] as const,

	byEscuela: (
		escuelaId: number,
		estado: EmpleadoEducativoFiltro = "TODOS",
		page: number = 0,
		size: number = 10,
		sort: SortState = {},
	) =>
		[
			...empleadoEducativoQueryKeys.lists(),
			"escuela",
			escuelaId,
			estado,
			page,
			size,
			sort,
		] as const,

	search: (
		escuelaId: number,
		search: string,
		page: number = 0,
		size: number = 10,
	) =>
		[
			...empleadoEducativoQueryKeys.lists(),
			"search",
			escuelaId,
			search,
			page,
			size,
		] as const,
};
