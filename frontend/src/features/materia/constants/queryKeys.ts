export const materiaQueryKeys = {
	all: ["materias"] as const,

	byEscuela: (escuelaId: number, page: number, size: number) =>
		[...materiaQueryKeys.all, "escuela", escuelaId, page, size] as const,

	selects: () => [...materiaQueryKeys.all, "select"] as const,

	selectByEscuela: (escuelaId: number) =>
		[...materiaQueryKeys.selects(), "escuela", escuelaId] as const,

	detail: (materiaId: number) =>
		[...materiaQueryKeys.all, "detail", materiaId] as const,

	select: (escuelaId: number) => ["materias", escuelaId, "select"] as const,
};
