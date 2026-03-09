import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import {
  cubrirConTitular,
} from "@/features/designaciones/services/designaciones.services";

import {
  mapAsignacionError,
  type UserError,
} from "../errors/asignacionErrorMapper";

import { designacionesQueryKeys } from "@/features/designaciones/utils/designaciones.queryKeys";
import { empleadosEducativosQueryKeys } from "@/features/empleadosEducativos/utils/empleadosEducativos.queryKeys";
import { asistenciasQueryKeys } from "@/features/asistencias/utils/asistencias.queryKeys";
import type { CaracteristicaAsignacion } from "../types/asignacion.types";


type Params = {
  designacionId: number;
  onSuccess: () => void;
  onClose: () => void;
};

export function useCubrirConTitular({
  designacionId,
  onSuccess,
  onClose,
}: Params) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: {
      empleadoId: number;
      fechaTomaPosesion: string;
      caracteristica?: CaracteristicaAsignacion;
    }) => cubrirConTitular(designacionId, data),

    onSuccess: (_, { empleadoId }) => {
      queryClient.invalidateQueries({
        queryKey: designacionesQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: empleadosEducativosQueryKeys.detail(empleadoId),
      });

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