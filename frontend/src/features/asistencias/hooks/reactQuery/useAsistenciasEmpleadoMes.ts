import { useQuery } from "@tanstack/react-query";
import { asistenciasQueryKeys } from "@/shared/utils/queryKeys/asistencias.queryKeys";
import { obtenerAsistenciasEmpleadoMes } from "../../../../services/asistencia.service";

type Options = {
	enabled?: boolean;
};

export function useAsistenciasEmpleadoMes(
	escuelaId: number,
	empleadoId: number,
	anio: number,
	mes: number,
	options?: Options,
) {
	return useQuery({
		queryKey: asistenciasQueryKeys.porEmpleadoMes(
			escuelaId,
			empleadoId,
			anio,
			mes,
		),
		queryFn: () =>
			obtenerAsistenciasEmpleadoMes(escuelaId, empleadoId, anio, mes),
		enabled: (options?.enabled ?? true) && Boolean(escuelaId),
	});
}
