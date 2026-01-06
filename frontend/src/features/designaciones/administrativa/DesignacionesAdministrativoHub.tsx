import HubPage, { HubItem } from "@/components/HubPage";
import { useNavigate } from "react-router-dom";

export default function DesignacionesAdministrativasHub() {
  const navigate = useNavigate();

  const items: HubItem[] = [
    {
      title: "Crear designación administrativa",
      description: "Asignar un empleado a un cargo administrativo",
      icon: "➕",
      onClick: () => navigate("/designaciones/administrativas/crear"),
    },
    {
      title: "Ver designaciones administrativas",
      description: "Consultar todas las designaciones administrativas",
      icon: "📋",
      onClick: () => navigate("/designaciones/administrativas/listar"),
    },
  ];

  return <HubPage items={items} variant="decision" />;
}
