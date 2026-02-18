export const licenciasQueryKeys = {
	all: ["licencias"] as const,

	byEscuela: (escuelaId: number, page: number, size: number) =>
		[...licenciasQueryKeys.all, "escuela", escuelaId, page, size] as const,

	detail: (licenciaId: number) =>
		[...licenciasQueryKeys.all, "detail", licenciaId] as const,
};
