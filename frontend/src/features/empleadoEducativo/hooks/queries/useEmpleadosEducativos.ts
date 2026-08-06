import { useQuery } from "@tanstack/react-query";

import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import type { SortState } from "@/shared/types";
import { empleadoEducativoQueryKeys } from "../../constants";
import { empleadoEducativoService } from "../../services";
import type { EmpleadoEducativoFiltro } from "../../types";

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
				? empleadoEducativoQueryKeys.byEscuela(
						escuelaId,
						estado,
						page,
						size,
						sort, // 👈 PASAMOS EL OBJETO
					)
				: empleadoEducativoQueryKeys.lists(),

		queryFn: () => {
			if (!escuelaId) {
				throw new Error("Escuela no definida");
			}

			return empleadoEducativoService.getEmpleadosPorEscuela(
				escuelaId,
				estado,
				page,
				size,
				sort,
			);
		},

		enabled: !!escuelaId,
		staleTime: 1000 * 60 * 5,
	});
}
