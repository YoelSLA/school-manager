import type { CursoCreateDTO } from "@/shared/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cursosQueryKeys } from "../../../shared/utils/queryKeys/cursos.queryKeys";
import { crearCurso } from "../services/cursos.services";

type CrearCursoParams = {
	escuelaId: number;
	data: CursoCreateDTO;
};

export function useCrearCurso() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ escuelaId, data }: CrearCursoParams) =>
			crearCurso(escuelaId, data),

		onSuccess: (_, _variables) => {
			// 🔥 invalidamos solo los cursos
			queryClient.invalidateQueries({
				queryKey: cursosQueryKeys.all,
			});
		},
	});
}
