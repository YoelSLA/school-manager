import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { designacionesQueryKeys } from "@/features/designacion/constants";
import { empleadoEducativoQueryKeys } from "@/features/empleadoEducativo/constants";
import { licenciaQueryKeys } from "../../constants";
import { licenciaService } from "../../services";
import type { LicenciaCreateDTO } from "../../types";

type Variables = {
	empleadoId: number;
	payload: LicenciaCreateDTO;
};

export function useCrearLicencia() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({ empleadoId, payload }: Variables) => {
			return licenciaService.crearLicencia(empleadoId, payload);
		},

		onSuccess: (_data, { empleadoId }) => {
			// 📄 1. Todas las listas de licencias
			queryClient.invalidateQueries({
				queryKey: licenciaQueryKeys.all,
			});

			// 👤 2. Detalle del empleado afectado
			queryClient.invalidateQueries({
				queryKey: empleadoEducativoQueryKeys.detail(empleadoId),
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
