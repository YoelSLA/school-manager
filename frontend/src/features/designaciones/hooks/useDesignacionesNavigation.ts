import { useNavigate } from "react-router-dom";

export function useDesignacionesNavigation() {
  const navigate = useNavigate();

  return {
    verDetalle: (designacionId: number) =>
      navigate(`/designaciones/${designacionId}`),

    crear: () =>
      navigate("/designaciones/crear"),

    editar: (designacionId: number) =>
      navigate(`/designaciones/${designacionId}/editar`),
  };
}