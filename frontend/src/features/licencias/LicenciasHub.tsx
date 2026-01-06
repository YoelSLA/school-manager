import { useNavigate } from "react-router-dom";
import HubPage, { HubItem } from "../../components/HubPage";

export default function LicenciasHub() {
  const navigate = useNavigate();

  const items: HubItem[] = [
    {
      title: "Solicitar licencia",
      description: "Registrar una licencia para una asignación vigente",
      icon: "📝",
      onClick: () => navigate("/licencias/solicitar"),
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
