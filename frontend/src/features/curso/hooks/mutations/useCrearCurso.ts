import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cursoQueryKeys } from "../../constants";
import { cursoService } from "../../services";
import type { CursoCreateDTO } from "../../types";

type CrearCursoParams = {
	escuelaId: number;
	data: CursoCreateDTO;
};

export function useCrearCurso() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ escuelaId, data }: CrearCursoParams) =>
			cursoService.createCurso(escuelaId, data),

		onSuccess: (_, _variables) => {
			// 🔥 invalidamos solo los cursos
			queryClient.invalidateQueries({
				queryKey: cursoQueryKeys.all,
			});
		},
	});
}
