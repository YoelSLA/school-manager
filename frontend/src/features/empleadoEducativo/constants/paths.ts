export const empleadoEducativoPaths = {
	base: "/empleadosEducativos",

	create: "/empleadosEducativos/crear",

	detail: (empleadoId: number | string) => `/empleadosEducativos/${empleadoId}`,

	edit: (empleadoId: number | string) =>
		`/empleadosEducativos/${empleadoId}/editar`,

	// ✅ NUEVOS
	crearCargo: (empleadoId: number | string) =>
		`/empleadosEducativos/${empleadoId}/cargos/crear`,

	crearLicencia: (empleadoId: number | string) =>
		`/empleadosEducativos/${empleadoId}/licencias/crear`,
};
