import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CursoCreateDTO } from "@/features/cursos/types/curso.types";
import { cursosQueryKeys } from "../../../shared/utils/queryKeys/cursos.queryKeys";
import { crearCurso } from "../services/curso.service";

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
