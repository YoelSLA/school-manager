import { useQuery } from "@tanstack/react-query";
import { asistenciaQueryKeys } from "../../constants";
import { asistenciaService } from "../../services";
import type { RolCountDTO } from "../../types";

export function useRolesConAsistencias(escuelaId: number, fecha: string) {
	return useQuery<RolCountDTO[]>({
		queryKey: asistenciaQueryKeys.rolesConAsistencias(escuelaId, fecha),
		queryFn: () => asistenciaService.getRolesConAsistencias(escuelaId, fecha),
		enabled: Boolean(escuelaId && fecha),
		staleTime: 1000 * 60 * 5,
	});
}
