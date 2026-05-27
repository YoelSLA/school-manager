export const licenciasQueryKeys = {
	all: ["licencias"] as const,

	byEscuela: (escuelaId: number, page: number, size: number) =>
		[...licenciasQueryKeys.all, "escuela", escuelaId, page, size] as const,

	detail: (licenciaId: number) =>
		[...licenciasQueryKeys.all, "detail", licenciaId] as const,

	designaciones: (licenciaId: number) =>
		[...licenciasQueryKeys.all, "designaciones", licenciaId] as const,

	timeline: (licenciaId: number) =>
		[...licenciasQueryKeys.all, "timeline", licenciaId] as const,
};
