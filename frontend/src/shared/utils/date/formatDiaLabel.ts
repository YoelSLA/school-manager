export function formatDiaLabel(dia: string) {
	const normalizado = dia === "MIERCOLES" ? "MIÉRCOLES" : dia;

	return normalizado.charAt(0) + normalizado.slice(1).toLowerCase();
}
