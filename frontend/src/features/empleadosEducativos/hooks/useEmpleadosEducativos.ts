import { useQuery } from "@tanstack/react-query";

import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import { getEmpleadosPorEscuela } from "../services/empleadosEducativos.services";
import type { EmpleadoEducativoFiltro } from "../types/empleadosEducativos.types";
import { empleadosEducativosQueryKeys } from "../utils/empleadosEducativos.queryKeys";

export function useEmpleadosEducativos(
	estado: EmpleadoEducativoFiltro = "TODOS",
) {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const escuelaId = escuelaActiva?.id;

	return useQuery({
		queryKey:
			escuelaId != null
				? empleadosEducativosQueryKeys.byEscuela(escuelaId, estado)
				: empleadosEducativosQueryKeys.lists(),

		queryFn: () =>
			getEmpleadosPorEscuela(
				escuelaId!,
				estado === "TODOS" ? undefined : estado,
			),

		enabled: !!escuelaId,
		staleTime: 1000 * 60 * 5,
	});
}
