export const licenciaPaths = {
	base: "/licencias",

	create: "/licencias/crear",

	detail: (licenciaId: number | string) => `/licencias/${licenciaId}`,

	designaciones: (licenciaId: number | string) =>
		`/licencias/${licenciaId}/designaciones`,
};
