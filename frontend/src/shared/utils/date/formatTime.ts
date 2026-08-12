export function formatTime(time: string) {
	const [hh, mm] = time.split(":");
	return `${hh}:${mm}`;
}
