import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { asistenciaQueryKeys } from "@/features/asistencia/constants";
import { designacionQueryKeys } from "@/features/designacion/constants";
import { designacionService } from "@/features/designacion/services";
import {
	mapAsignacionError,
	type UserError,
} from "../../errors/asignacionErrorMapper";

type Params = {
	designacionId: number;
	onSuccess: () => void;
	onClose?: () => void;
};

export function useDeleteAsignacion({
	designacionId,
	onSuccess,
	onClose,
}: Params) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (asignacionId: number) =>
			designacionService.eliminarAsignacion(designacionId, asignacionId),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: designacionQueryKeys.all,
			});

			queryClient.invalidateQueries({
				queryKey: asistenciaQueryKeys.all,
			});

			onSuccess();
			onClose?.();
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
