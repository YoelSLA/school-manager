import { useMutation, useQueryClient } from "@tanstack/react-query";
import { designacionesQueryKeys } from "../utils/designaciones.queryKeys";
import type { DesignacionAdministrativaCreateDTO } from "../form/designacion.form.types";
import { actualizarDesignacionAdministrativa } from "../services/designaciones.services";

export function useActualizarDesignacionAdministrativa(
  escuelaId?: number,
  designacionId?: number
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DesignacionAdministrativaCreateDTO) => {
      if (!designacionId) {
        throw new Error("designacionId requerido para editar designación");
      }

      return actualizarDesignacionAdministrativa(designacionId, data);
    },

    onSuccess: () => {
      if (!escuelaId || !designacionId) return;

      queryClient.invalidateQueries({
        queryKey: designacionesQueryKeys.administrativa.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: designacionesQueryKeys.administrativa.detail(designacionId),
      });
    }
  });
}