export const licenciaEstatutariaQueryKeys = {
	all: ["licencias-estatutarias"] as const,

	list: (page: number, size: number) =>
		[...licenciaEstatutariaQueryKeys.all, "list", page, size] as const,

	detail: (licenciaEstatutariaId: number) =>
		[
			...licenciaEstatutariaQueryKeys.all,
			"detail",
			licenciaEstatutariaId,
		] as const,
};
