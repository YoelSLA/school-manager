import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import type { EmpleadoEducativoMinimoDTO } from "@/shared/utils/types";
import { empleadosEducativosQueryKeys } from "../../../shared/utils/queryKeys/empleadosEducativos.queryKeys";
import { buscarEmpleadosPorEscuela } from "../services/empleadosEducativos.services";

export default function useEmpleadoSearch(search: string) {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const escuelaId = escuelaActiva?.id;

	if (!escuelaId) {
		throw new Error("empleadoId es requerido");
	}

	const enabled = !!escuelaId && search.length >= 2;

	const query = useQuery<EmpleadoEducativoMinimoDTO[]>({
		queryKey: enabled
			? empleadosEducativosQueryKeys.search(escuelaId, search)
			: empleadosEducativosQueryKeys.lists(),

		queryFn: () => buscarEmpleadosPorEscuela(escuelaId, search),

		enabled,
		staleTime: 30_000,
		placeholderData: keepPreviousData,
	});

	return {
		empleados: query.data ?? [],
		loading: query.isFetching,
	};
}
