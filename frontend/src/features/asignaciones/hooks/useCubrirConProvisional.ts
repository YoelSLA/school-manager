import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { asistenciasQueryKeys } from "@/utils/queryKeys/asistencias.queryKeys";
import { cubrirConProvisional } from "@/features/designaciones/services/designaciones.services";

import { designacionesQueryKeys } from "@/utils/queryKeys/designaciones.queryKeys";
import { empleadosEducativosQueryKeys } from "@/utils/queryKeys/empleadosEducativos.queryKeys";
import {
	mapAsignacionError,
	type UserError,
} from "../errors/asignacionErrorMapper";
import { CubrirProvisionalDTO } from "@/utils/types";

type Params = {
	designacionId: number;
	onSuccess: () => void;
	onClose: () => void;
};

export function useCubrirConProvisional({
	designacionId,
	onSuccess,
	onClose,
}: Params) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data: CubrirProvisionalDTO) =>
			cubrirConProvisional(designacionId, data),

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
