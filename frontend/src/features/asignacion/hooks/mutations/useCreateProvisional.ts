import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { cubrirConProvisional } from "@/features/designacion/services";
import { designacionesQueryKeys } from "@/features/designaciones/designaciones.queryKeys";
import { empleadosEducativosQueryKeys } from "@/features/empleadosEducativos/empleadosEducativos.queryKeys";
import { asistenciasQueryKeys } from "@/shared/utils/queryKeys/asistencias.queryKeys";
import {
	mapAsignacionError,
	type UserError,
} from "../../errors/asignacionErrorMapper";
import type { CubrirProvisionalDTO } from "../../types";

type Params = {
	designacionId: number;
	onSuccess: () => void;
	onClose: () => void;
};

export function useCreateProvisional({
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
