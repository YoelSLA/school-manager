import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearCurso } from "../services/cursos.services";
import type { CrearCursoDTO } from "../types/cursos.types";
import { cursosQueryKeys } from "../utils/cursos.queryKeys";

type CrearCursoParams = {
	escuelaId: number;
	data: CrearCursoDTO;
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
