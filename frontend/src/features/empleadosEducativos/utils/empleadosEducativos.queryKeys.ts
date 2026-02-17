import type { SortState } from "@/utils/types";
import type { EmpleadoEducativoFiltro } from "../types/empleadosEducativos.types";

export const empleadosEducativosQueryKeys = {
	all: ["empleadoEducativo"] as const,

	lists: () => [...empleadosEducativosQueryKeys.all, "list"] as const,

	detail: (empleadoId: number) =>
		[...empleadosEducativosQueryKeys.all, "detail", empleadoId] as const,

	byEscuela: (
		escuelaId: number,
		estado: EmpleadoEducativoFiltro = "TODOS",
		page: number = 0,
		size: number = 10,
		sort: SortState = {},
	) =>
		[
			...empleadosEducativosQueryKeys.lists(),
			"escuela",
			escuelaId,
			estado,
			page,
			size,
			sort, // 👈 ahora es objeto
		] as const,

	search: (
		escuelaId: number,
		search: string,
		page: number = 0,
		size: number = 10,
	) =>
		[
			...empleadosEducativosQueryKeys.lists(),
			"search",
			escuelaId,
			search,
			page,
			size,
		] as const,
};
