import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CursoCreateDTO } from "@/shared/utils/types";
import { crearCurso } from "../../../services/curso.service";
import { cursosQueryKeys } from "../../../shared/utils/queryKeys/cursos.queryKeys";

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
