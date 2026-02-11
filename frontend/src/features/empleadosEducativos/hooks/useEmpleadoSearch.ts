import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import { buscarEmpleadosPorEscuela } from "../services/empleadosEducativos.services";
import type { EmpleadoEducativoMinimoDTO } from "../types/empleadosEducativos.types";
import { empleadosEducativosQueryKeys } from "../utils/empleadosEducativos.queryKeys";

export default function useEmpleadoSearch(search: string) {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const escuelaId = escuelaActiva?.id;

	const enabled = !!escuelaId && search.length >= 2;

	const query = useQuery<EmpleadoEducativoMinimoDTO[]>({
		queryKey: enabled
			? empleadosEducativosQueryKeys.search(escuelaId!, search)
			: empleadosEducativosQueryKeys.lists(),

		queryFn: () => buscarEmpleadosPorEscuela(escuelaId!, search),

		enabled,
		staleTime: 30_000,
		placeholderData: keepPreviousData,
	});

	return {
		empleados: query.data ?? [],
		loading: query.isFetching,
	};
}
