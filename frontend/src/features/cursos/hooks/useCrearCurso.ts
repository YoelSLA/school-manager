import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearCurso } from "../services/cursos.services";
import { cursosQueryKeys } from "../utils/cursos.queryKeys";
import type { CrearCursoDTO } from "../types/cursos.types";

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
