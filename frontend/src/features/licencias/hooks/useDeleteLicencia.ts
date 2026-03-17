import { useMutation, useQueryClient } from "@tanstack/react-query";
import { licenciasQueryKeys } from "@/utils/queryKeys/licencias.queryKeys";
import { deleteLicencia } from "../services/licencias.services";

export default function useDeleteLicencia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (licenciaId: number) => deleteLicencia(licenciaId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: licenciasQueryKeys.all,
      });
    },
  });
}