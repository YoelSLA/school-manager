import { useNavigate } from "react-router-dom";
import HubPage from "../HubPage";

export default function DesignacionesHub() {
  const navigate = useNavigate();

  return (
    <HubPage
      variant="decision"
      items={[
        {
          title: "Administrativo",
          description: "Designaciones de cargos administrativos",
          icon: "🗂",
          onClick: () => navigate("/designaciones/administrativas"),
        },
        {
          title: "Por cursos",
          description: "Designaciones de docentes por curso y materia",
          icon: "📘",
          onClick: () => navigate("/designaciones/cursos"),
        },
      ]}
    />
  );
}
