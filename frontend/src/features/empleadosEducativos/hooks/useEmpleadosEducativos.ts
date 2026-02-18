import { useQuery } from "@tanstack/react-query";

import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import { getEmpleadosPorEscuela } from "../services/empleadosEducativos.services";
import type { EmpleadoEducativoFiltro } from "../types/empleadosEducativos.types";
import { empleadosEducativosQueryKeys } from "../utils/empleadosEducativos.queryKeys";
import type { SortState } from "@/utils/types";

export function useEmpleadosEducativos(
	estado: EmpleadoEducativoFiltro = "TODOS",
	page: number = 0,
	size: number = 10,
	sort: SortState = {},
) {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const escuelaId = escuelaActiva?.id;

	return useQuery({
		queryKey:
			escuelaId != null
				? empleadosEducativosQueryKeys.byEscuela(
						escuelaId,
						estado,
						page,
						size,
						sort, // 👈 PASAMOS EL OBJETO
					)
				: empleadosEducativosQueryKeys.lists(),

		queryFn: () => {
			if (!escuelaId) {
				throw new Error("Escuela no definida");
			}

			return getEmpleadosPorEscuela(
				escuelaId,
				estado,
				page,
				size,
				sort, // 👈 PASAMOS EL OBJETO
			);
		},

		enabled: !!escuelaId,
		staleTime: 1000 * 60 * 5,
	});
}
