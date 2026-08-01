export const licenciaQueryKeys = {
	all: ["licencias"] as const,

	byEscuela: (escuelaId: number, page: number, size: number) =>
		[...licenciaQueryKeys.all, "escuela", escuelaId, page, size] as const,

	detail: (licenciaId: number) =>
		[...licenciaQueryKeys.all, "detail", licenciaId] as const,

	designaciones: (licenciaId: number) =>
		[...licenciaQueryKeys.all, "designaciones", licenciaId] as const,

	timeline: (licenciaId: number) =>
		[...licenciaQueryKeys.all, "timeline", licenciaId] as const,
};
