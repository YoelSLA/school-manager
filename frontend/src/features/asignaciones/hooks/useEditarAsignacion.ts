import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editarAsignacion } from "@/features/designaciones/services/designaciones.services";
import { designacionesQueryKeys } from "@/utils/queryKeys/designaciones.queryKeys";
import { EditarAsignacionDTO } from "@/utils/types";

type Props = {
	designacionId: number;
	asignacionId: number;
	onClose: () => void;
	onSuccess: () => void;
};

export function useEditarAsignacion({
	designacionId,
	asignacionId,
	onClose,
	onSuccess,
}: Props) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: EditarAsignacionDTO) =>
			editarAsignacion(designacionId, asignacionId, payload),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: designacionesQueryKeys.cargos.activo(designacionId),
			});

			queryClient.invalidateQueries({
				queryKey: designacionesQueryKeys.cargos.all(designacionId),
			});

			queryClient.invalidateQueries({
				queryKey: designacionesQueryKeys.detail(designacionId),
			});

			onSuccess();
			onClose();
		},
	});
}
