import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { asistenciasQueryKeys } from "@/utils/queryKeys/asistencias.queryKeys";
import { cubrirConTitular } from "@/features/designaciones/services/designaciones.services";
import { designacionesQueryKeys } from "@/utils/queryKeys/designaciones.queryKeys";
import { empleadosEducativosQueryKeys } from "@/utils/queryKeys/empleadosEducativos.queryKeys";
import {
	mapAsignacionError,
	type UserError,
} from "../errors/asignacionErrorMapper";
import { CubrirTitularDTO } from "@/utils/types";

type Props = {
	designacionId: number;
	onSuccess: () => void;
	onClose: () => void;
};

export function useCubrirConTitular({
	designacionId,
	onSuccess,
	onClose,
}: Props) {
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
