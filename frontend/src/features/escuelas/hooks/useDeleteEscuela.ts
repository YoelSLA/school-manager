import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eliminarEscuela } from "../services/escuelas.services";
import { escuelasQueryKeys } from "@/utils/queryKeys/escuelas.queryKeys";

export function useDeleteEscuela() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => eliminarEscuela(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: escuelasQueryKeys.lists(),
      });
    },
  });
}