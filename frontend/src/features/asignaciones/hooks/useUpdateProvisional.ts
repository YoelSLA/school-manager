import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { actualizarAsignacionProvisional } from "@/features/designaciones/designaciones.services";
import { asistenciasQueryKeys } from "@/shared/utils/queryKeys/asistencias.queryKeys";
import { designacionesQueryKeys } from "@/shared/utils/queryKeys/designaciones.queryKeys";
import { empleadosEducativosQueryKeys } from "@/shared/utils/queryKeys/empleadosEducativos.queryKeys";
import type { CubrirProvisionalDTO } from "@/shared/utils/types";
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

export function useUpdateProvisional({
	designacionId,
	asignacionId,
	onSuccess,
	onClose,
}: Props) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data: CubrirProvisionalDTO) =>
			actualizarAsignacionProvisional(designacionId, asignacionId, data),

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
