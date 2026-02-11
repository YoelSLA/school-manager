import { useQuery } from "@tanstack/react-query";
import { obtenerAsistenciasEmpleadoMes } from "../services/asistencias.services";
import { asistenciasQueryKeys } from "../utils/asistencias.queryKeys";

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
