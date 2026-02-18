export const materiasQueryKeys = {
	all: ["materias"] as const,

	byEscuela: (escuelaId: number, page: number, size: number) =>
		[...materiasQueryKeys.all, "escuela", escuelaId, page, size] as const,

	selects: () => [...materiasQueryKeys.all, "select"] as const,

	selectByEscuela: (escuelaId: number) =>
		[...materiasQueryKeys.selects(), "escuela", escuelaId] as const,

	detail: (materiaId: number) =>
		[...materiasQueryKeys.all, "detail", materiaId] as const,
};
