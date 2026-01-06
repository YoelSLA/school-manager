import HubPage, { HubItem } from "@/components/HubPage";
import { useNavigate } from "react-router-dom";

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
