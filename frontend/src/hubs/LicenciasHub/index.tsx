import { HubItem } from "@/utils/types";
import { useNavigate } from "react-router-dom";
import HubPage from "../HubPage";

export default function LicenciasHub() {
  const navigate = useNavigate();

  const items: HubItem[] = [
    {
      title: "Crear licencia",
      description: "Registrar una licencia para una asignación vigente",
      icon: "📝",
      onClick: () => navigate("/licencias/crear"),
    },
    {
      title: "Ver licencias",
      description: "Consultar licencias vigentes y el historial",
      icon: "📅",
      onClick: () => navigate("/licencias/listar"),
    },
  ];

  return <HubPage items={items} variant="decision" />;
}
