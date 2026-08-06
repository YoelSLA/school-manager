export function formatLicenciaLabel(codigo: string, descripcion: string) {
	return `${codigo.padEnd(6, " ")} — ${descripcion}`;
}
