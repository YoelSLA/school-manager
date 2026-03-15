import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearCurso } from "../services/cursos.services";
import { cursosQueryKeys } from "../../../utils/queryKeys/cursos.queryKeys";
import { CursoCreateDTO } from "@/utils/types";

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
