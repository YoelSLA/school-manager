import { useQuery } from "@tanstack/react-query";
import { asistenciaService } from "@/features/asistencia/services";
import { asistenciaQueryKeys } from "../../constants";

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
		queryKey: asistenciaQueryKeys.porEmpleadoMes(
			escuelaId,
			empleadoId,
			anio,
			mes,
		),
		queryFn: () =>
			asistenciaService.getAsistenciasEmpleadoMes(
				escuelaId,
				empleadoId,
				anio,
				mes,
			),
		enabled: (options?.enabled ?? true) && Boolean(escuelaId),
	});
}
