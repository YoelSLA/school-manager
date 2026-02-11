import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import {
	cubrirConProvisional,
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

type Variables = {
	empleadoId: number;
	tipoAsignacion: "TITULAR" | "PROVISIONAL";
	fechaTomaPosesion: string;
	caracteristica?: CaracteristicaAsignacion;
};

export function useCrearAsignacion({
	designacionId,
	onSuccess,
	onClose,
}: Params) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({
			empleadoId,
			tipoAsignacion,
			fechaTomaPosesion,
			caracteristica,
		}: Variables) => {
			if (tipoAsignacion === "TITULAR") {
				return cubrirConTitular(designacionId, {
					empleadoId,
					fechaTomaPosesion,
					caracteristica,
				});
			}

			if (tipoAsignacion === "PROVISIONAL") {
				return cubrirConProvisional(designacionId, {
					empleadoId,
					fechaTomaPosesion,
				});
			}

			throw new Error("Tipo de asignación inválido");
		},

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

	return {
		submit: mutation.mutateAsync,
		error: mutation.error as UserError | null,
		clearError: mutation.reset,
		isSubmitting: mutation.isPending,
	};
}
