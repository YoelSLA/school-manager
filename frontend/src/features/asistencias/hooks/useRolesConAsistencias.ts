import { useQuery } from "@tanstack/react-query";
import { obtenerRolesConAsistencias } from "../services/asistencias.services";
import { asistenciasQueryKeys } from "../../../utils/queryKeys/asistencias.queryKeys";
import type { RolCountDTO } from "@/utils/types";

export function useRolesConAsistencias(
	escuelaId: number,
	fecha: string,
) {
	return useQuery<RolCountDTO[]>({
		queryKey: asistenciasQueryKeys.rolesConAsistencias(
			escuelaId,
			fecha,
		),
		queryFn: () => obtenerRolesConAsistencias(escuelaId, fecha),
		enabled: Boolean(escuelaId && fecha),
		staleTime: 1000 * 60 * 5,
	});
}