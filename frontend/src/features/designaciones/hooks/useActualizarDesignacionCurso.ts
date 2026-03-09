import { useMutation, useQueryClient } from "@tanstack/react-query";
import { designacionesQueryKeys } from "../utils/designaciones.queryKeys";
import { DesignacionCursoCreateDTO } from "../form/designacion.form.types";
import { actualizarDesignacionCurso } from "../services/designaciones.services";

export function useActualizarDesignacionCurso() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      designacionId,
      data,
    }: {
      designacionId: number;
      data: DesignacionCursoCreateDTO;
    }) => {
      return actualizarDesignacionCurso(designacionId, data);
    },

    onSuccess: (_, variables) => {
      const { designacionId } = variables;

      queryClient.invalidateQueries({
        queryKey: designacionesQueryKeys.detail(designacionId),
      });

      queryClient.invalidateQueries({
        queryKey: designacionesQueryKeys.curso.lists(),
      });
    },
  });
}