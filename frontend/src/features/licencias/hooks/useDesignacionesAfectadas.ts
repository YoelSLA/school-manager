import { useQuery } from "@tanstack/react-query";
import { getDesignacionesAfectadas } from "../services/licencias.services";
import { licenciasQueryKeys } from "../utils/licencias.queryKeys";

export const useDesignacionesAfectadas = (licenciaId?: number) => {
  return useQuery({
    queryKey: licenciaId
      ? licenciasQueryKeys.designaciones(licenciaId)
      : [],
    queryFn: () => {
      if (!licenciaId) throw new Error("licenciaId requerido");
      return getDesignacionesAfectadas(licenciaId);
    },
    enabled: !!licenciaId,
  });
};