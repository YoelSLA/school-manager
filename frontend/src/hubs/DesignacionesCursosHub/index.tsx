import { HubItem } from "@/utils/types";
import { useNavigate } from "react-router-dom";
import HubPage from "../HubPage";

export default function DesignacionesCursosHub() {
  const navigate = useNavigate();

  const items: HubItem[] = [
    {
      title: "Crear designación",
      description: "Asignar un docente a un curso y materia",
      icon: "➕",
      onClick: () => navigate("/designaciones/cursos/crear"),
    },
    {
      title: "Ver designaciones",
      description: "Consultar todas las designaciones por curso",
      icon: "📘",
      onClick: () => navigate("/designaciones/cursos/listar"),
    },
  ];

  return <HubPage items={items} variant="decision" />;
}
