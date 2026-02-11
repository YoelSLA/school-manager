import type { EmpleadoEducativoFiltro } from "../types/empleadosEducativos.types";

export const empleadosEducativosQueryKeys = {
	all: ["empleadoEducativo"] as const,

	lists: () => [...empleadosEducativosQueryKeys.all, "list"] as const,

	detail: (empleadoId: number) =>
		[...empleadosEducativosQueryKeys.all, empleadoId] as const,

	byEscuela: (escuelaId: number, estado: EmpleadoEducativoFiltro = "TODOS") =>
		[
			...empleadosEducativosQueryKeys.lists(),
			"escuela",
			escuelaId,
			estado,
		] as const,

	search: (escuelaId: number, search: string) =>
		[
			...empleadosEducativosQueryKeys.lists(),
			"search",
			escuelaId,
			search,
		] as const,
};
