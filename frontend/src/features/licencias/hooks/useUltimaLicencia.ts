import type { LicenciaTimelineItemDTO } from "../types/licencia.types";

export function useUltimaLicencia(
	timeline: LicenciaTimelineItemDTO[],
	licenciaActualId: number,
) {
	if (timeline.length === 0) return false;

	const ultima = timeline.at(-1);
	return ultima?.id === licenciaActualId;
}
