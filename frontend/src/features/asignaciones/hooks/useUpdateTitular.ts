import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { actualizarAsignacionTitular } from "@/features/designaciones/services/designaciones.services";
import { asistenciasQueryKeys } from "@/utils/queryKeys/asistencias.queryKeys";
import { designacionesQueryKeys } from "@/utils/queryKeys/designaciones.queryKeys";
import { empleadosEducativosQueryKeys } from "@/utils/queryKeys/empleadosEducativos.queryKeys";
import type { CubrirTitularDTO } from "@/utils/types";
import {
  mapAsignacionError,
  type UserError,
} from "../errors/asignacionErrorMapper";

type Props = {
  designacionId: number;
  asignacionId: number;
  onSuccess: () => void;
  onClose: () => void;
};

export function useUpdateTitular({
  designacionId,
  asignacionId,
  onSuccess,
  onClose,
}: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CubrirTitularDTO) =>
      actualizarAsignacionTitular(designacionId, asignacionId, data),

    onSuccess: (_, { empleadoId }) => {
      queryClient.invalidateQueries({
        queryKey: designacionesQueryKeys.all,
      });

      if (empleadoId) {
        queryClient.invalidateQueries({
          queryKey: empleadosEducativosQueryKeys.detail(empleadoId),
        });
      }

      queryClient.invalidateQueries({
        queryKey: asistenciasQueryKeys.all,
      });

      onSuccess();
      onClose();
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