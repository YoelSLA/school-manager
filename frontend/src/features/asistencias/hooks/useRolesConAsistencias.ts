import { useQuery } from "@tanstack/react-query";
import { obtenerRolesConAsistencias } from "../services/asistencias.services";
import type { RolCountDTO } from "../types/asistencias.types";
import { asistenciasQueryKeys } from "../utils/asistencias.queryKeys";

export function useRolesConAsistencias(fecha: string) {
	return useQuery<RolCountDTO[]>({
		queryKey: asistenciasQueryKeys.rolesConAsistencias(fecha),
		queryFn: () => obtenerRolesConAsistencias(fecha),
		enabled: Boolean(fecha),
		staleTime: 1000 * 60 * 5,
	});
}
