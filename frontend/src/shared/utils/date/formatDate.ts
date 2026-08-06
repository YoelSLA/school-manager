export function formatDate(fechaISO?: string | null): string {
	if (!fechaISO) return "Actualidad";

	const [y, m, d] = fechaISO.split("-").map(Number);

	const meses = [
		"ene",
		"feb",
		"mar",
		"abr",
		"may",
		"jun",
		"jul",
		"ago",
		"sep",
		"oct",
		"nov",
		"dic",
	];

	return `${String(d).padStart(2, "0")} ${meses[m - 1]} ${y}`;
}
