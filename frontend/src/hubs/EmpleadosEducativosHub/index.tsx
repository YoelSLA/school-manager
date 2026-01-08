import { HubItem } from "@/utils/types";
import { useNavigate } from "react-router-dom";
import HubPage from "../HubPage";

export default function EmpleadosHub() {
  const navigate = useNavigate();

  const items: HubItem[] = [
    {
      title: "Crear personal",
      description: "Registrar un nuevo empleado educativo",
      icon: "➕",
      onClick: () => navigate("/empleados/crear"),
    },
    {
      title: "Ver equipo",
      description: "Consultar y administrar el personal",
      icon: "👥",
      onClick: () => navigate("/empleados/listar"),
    },
  ];

  return <HubPage items={items} variant="decision" className="empleados-hub" />;
}
