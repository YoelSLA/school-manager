/**
 * Crea una fecha interpretando YYYY-MM-DD como fecha LOCAL (Argentina)
 */
export function createArgentinaDate(fecha: string): Date | null {
	if (!fecha) return null;

	const parts = fecha.split("-");
	if (parts.length !== 3) return null;

	const [year, month, day] = parts.map(Number);

	if (!year || !month || !day) return null;

	// 👇 se crea en horario local (NO UTC)
	return new Date(year, month - 1, day);
}
