import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { asistenciaQueryKeys } from "@/features/asistencia/constants";
import { designacionQueryKeys } from "@/features/designacion/constants";
import { designacionService } from "@/features/designacion/services";
import { empleadoEducativoQueryKeys } from "@/features/empleadoEducativo/constants";
import {
	mapAsignacionError,
	type UserError,
} from "../../errors/asignacionErrorMapper";
import type { CubrirTitularDTO } from "../../types";

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
			designacionService.actualizarAsignacionTitular(
				designacionId,
				asignacionId,
				data,
			),

		onSuccess: (_, { empleadoId }) => {
			queryClient.invalidateQueries({
				queryKey: designacionQueryKeys.all,
			});

			if (empleadoId) {
				queryClient.invalidateQueries({
					queryKey: empleadoEducativoQueryKeys.detail(empleadoId),
				});
			}

			queryClient.invalidateQueries({
				queryKey: asistenciaQueryKeys.all,
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
