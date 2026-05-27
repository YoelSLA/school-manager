import { cubrirConTitular } from "@/features/designaciones/services/designaciones.services";
import { asistenciasQueryKeys } from "@/shared/utils/queryKeys/asistencias.queryKeys";
import { designacionesQueryKeys } from "@/shared/utils/queryKeys/designaciones.queryKeys";
import { empleadosEducativosQueryKeys } from "@/shared/utils/queryKeys/empleadosEducativos.queryKeys";
import type { CubrirTitularDTO } from "@/shared/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
    mapAsignacionError,
    type UserError,
} from "../errors/asignacionErrorMapper";

type Props = {
	designacionId: number;
	onSuccess: () => void;
	onClose: () => void;
};

export function useCreateTitular({ designacionId, onSuccess, onClose }: Props) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data: CubrirTitularDTO) =>
			cubrirConTitular(designacionId, data),

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
