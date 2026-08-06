export function formatPeriod(desde: string, hasta: string) {
	const fmt = (f: string) =>
		new Date(f).toLocaleDateString("es-AR", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});

	return `${fmt(desde)} ➡️ ${fmt(hasta)}`;
}
