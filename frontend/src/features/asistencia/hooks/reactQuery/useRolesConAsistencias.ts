import { useQuery } from "@tanstack/react-query";
import { obtenerRolesConAsistencias } from "@/features/asistencias/services/asistencia.service";
import type { RolCountDTO } from "@/features/asistencias/types/asistencia.types";
import { asistenciasQueryKeys } from "@/shared/utils/queryKeys/asistencias.queryKeys";

export function useRolesConAsistencias(escuelaId: number, fecha: string) {
	return useQuery<RolCountDTO[]>({
		queryKey: asistenciasQueryKeys.rolesConAsistencias(escuelaId, fecha),
		queryFn: () => obtenerRolesConAsistencias(escuelaId, fecha),
		enabled: Boolean(escuelaId && fecha),
		staleTime: 1000 * 60 * 5,
	});
}
