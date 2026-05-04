import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  mapAsignacionError,
  type UserError,
} from "../errors/asignacionErrorMapper";
import { asistenciasQueryKeys } from "@/utils/queryKeys/asistencias.queryKeys";
import { designacionesQueryKeys } from "@/utils/queryKeys/designaciones.queryKeys";
import { eliminarAsignacion } from "@/features/designaciones/services/designaciones.services";


type Params = {
  designacionId: number;
  onSuccess: () => void;
  onClose?: () => void;
};

export function useDeleteAsignacion({
  designacionId,
  onSuccess,
  onClose,
}: Params) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (asignacionId: number) =>
      eliminarAsignacion(designacionId, asignacionId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: designacionesQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: asistenciasQueryKeys.all,
      });

      onSuccess();
      onClose?.();
    },

    onError: (err) => {
      if (axios.isAxiosError(err)) {
        return mapAsignacionError(err.response?.data);
      }

      return {
        title: "Error inesperado",
        message: "Ocurrió un error inesperado. Intentá nuevamente.",
      } satisfies UserError;
    },
  });

  return mutation;
}