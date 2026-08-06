const ARG_TZ = "America/Argentina/Buenos_Aires";

/**
 * Devuelve la fecha actual en Argentina en formato YYYY-MM-DD
 */
export function getTodayArgentinaISO(): string {
	const now = new Date();

	const formatter = new Intl.DateTimeFormat("en-CA", {
		timeZone: ARG_TZ,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});

	return formatter.format(now);
}
