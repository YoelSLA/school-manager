import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { designacionesQueryKeys } from "@/utils/queryKeys/designaciones.queryKeys";
import { crearLicencia } from "@/features/empleadosEducativos/services/empleadosEducativos.services";
import { empleadosEducativosQueryKeys } from "@/utils/queryKeys/empleadosEducativos.queryKeys";
import { LicenciaCreateDTO } from "@/utils/types";
import { licenciasQueryKeys } from "@/utils/queryKeys/licencias.queryKeys";

type Variables = {
	empleadoId: number;
	payload: LicenciaCreateDTO;
};

export function useCrearLicencia() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({ empleadoId, payload }: Variables) => {
			return crearLicencia(empleadoId, payload);
		},

		onSuccess: (_data, { empleadoId }) => {
			// 📄 1. Todas las listas de licencias
			queryClient.invalidateQueries({
				queryKey: licenciasQueryKeys.all,
			});

			// 👤 2. Detalle del empleado afectado
			queryClient.invalidateQueries({
				queryKey: empleadosEducativosQueryKeys.detail(empleadoId),
			});

			// 🏫 3. Designaciones impactadas
			queryClient.invalidateQueries({
				queryKey: designacionesQueryKeys.all,
			});

			// 🔙 Volver
			navigate(-1);
		},
	});

	return {
		crearLicencia: mutation.mutateAsync,
		isLoading: mutation.isPending,
		error: mutation.error,
	};
}
