export const licenciasQueryKeys = {
	all: ["licencias"] as const,

	lists: () => [...licenciasQueryKeys.all, "list"] as const,

	byEscuela: (escuelaId: number) =>
		[...licenciasQueryKeys.lists(), "escuela", escuelaId] as const,

	detail: (licenciaId: number) =>
		[...licenciasQueryKeys.all, "detail", licenciaId] as const,
};
