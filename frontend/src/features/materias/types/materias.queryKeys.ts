export const materiasQueryKeys = {
	all: ["materias"] as const,

	lists: () => [...materiasQueryKeys.all, "list"] as const,

	byEscuela: (escuelaId: number) =>
		[...materiasQueryKeys.lists(), "escuela", escuelaId] as const,

	selects: () => [...materiasQueryKeys.all, "select"] as const,

	selectByEscuela: (escuelaId: number) =>
		[...materiasQueryKeys.selects(), "escuela", escuelaId] as const,

	detail: (materiaId: number) =>
		[...materiasQueryKeys.all, "detail", materiaId] as const,
};
