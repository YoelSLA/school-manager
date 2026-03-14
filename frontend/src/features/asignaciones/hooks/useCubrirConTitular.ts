import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { asistenciasQueryKeys } from "@/features/asistencias/utils/asistencias.queryKeys";
import { cubrirConTitular } from "@/features/designaciones/services/designaciones.services";
import { designacionesQueryKeys } from "@/features/designaciones/utils/designaciones.queryKeys";
import { empleadosEducativosQueryKeys } from "@/features/empleadosEducativos/utils/empleadosEducativos.queryKeys";
import {
	mapAsignacionError,
	type UserError,
} from "../errors/asignacionErrorMapper";
import type { CubrirTitularRequest } from "../types/asignacion.types";

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
		mutationFn: (data: CubrirTitularRequest) =>
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
