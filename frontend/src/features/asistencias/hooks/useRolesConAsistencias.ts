import type { RolCountDTO } from "@/shared/utils/types";
import { useQuery } from "@tanstack/react-query";
import { asistenciasQueryKeys } from "../../../shared/utils/queryKeys/asistencias.queryKeys";
import { obtenerRolesConAsistencias } from "../services/asistencias.services";

export function useRolesConAsistencias(escuelaId: number, fecha: string) {
	return useQuery<RolCountDTO[]>({
		queryKey: asistenciasQueryKeys.rolesConAsistencias(escuelaId, fecha),
		queryFn: () => obtenerRolesConAsistencias(escuelaId, fecha),
		enabled: Boolean(escuelaId && fecha),
		staleTime: 1000 * 60 * 5,
	});
}
