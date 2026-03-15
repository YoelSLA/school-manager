import { useQuery } from "@tanstack/react-query";
import { listarDesignacionesCursos } from "../services/designaciones.services";
import { designacionesQueryKeys } from "../../../utils/queryKeys/designaciones.queryKeys";

export type DesignacionCursoFilter = {
	cursoId?: string;
	materiaId?: string;
	orientacion?: string;
	estado?: string;
};

type Options = {
	enabled?: boolean;
};

export function useDesignacionesCursos(
	escuelaId?: number,
	page: number = 0,
	size: number = 10,
	filter?: DesignacionCursoFilter,
	options?: Options,
) {
	const enabled = escuelaId != null && (options?.enabled ?? true);

	return useQuery({
		queryKey:
			escuelaId != null
				? designacionesQueryKeys.curso.byEscuela(escuelaId, page, size, filter)
				: designacionesQueryKeys.curso.lists(),

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId es requerido");

			return listarDesignacionesCursos(escuelaId, page, size, filter);
		},

		enabled,

		placeholderData: (previousData) => previousData,

		staleTime: 0,
	});
}
