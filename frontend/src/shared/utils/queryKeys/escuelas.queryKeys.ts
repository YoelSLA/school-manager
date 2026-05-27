export const escuelasQueryKeys = {
	all: ["escuelas"] as const,

	lists: () => [...escuelasQueryKeys.all, "list"] as const,

	detail: (escuelaId: number) => [...escuelasQueryKeys.all, escuelaId] as const,
};
