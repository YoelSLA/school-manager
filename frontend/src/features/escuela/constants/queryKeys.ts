export const escuelaQueryKeys = {
	all: ["escuelas"] as const,

	lists: () => [...escuelaQueryKeys.all, "list"] as const,

	detail: (escuelaId: number) => [...escuelaQueryKeys.all, escuelaId] as const,
};
