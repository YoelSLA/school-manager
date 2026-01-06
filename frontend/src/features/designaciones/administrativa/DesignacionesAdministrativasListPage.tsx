import DesignacionAdministrativaCard from "@/components/cards/DesignacionAdministrativaCard";
import { useEscuela } from "@/context/EscuelaContext";
import { listarDesignacionesAdministrativas } from "@/services/designacionesService";
import { DesignacionAdministrativaResponseDTO } from "@/utils/types";
import { useEffect, useState } from "react";
import "./designacionesAdministrativasListPage.css";

export default function DesignacionesAdministrativasListPage() {
  const { escuelaActiva } = useEscuela();

  const [designaciones, setDesignaciones] = useState<
    DesignacionAdministrativaResponseDTO[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!escuelaActiva) return;

    listarDesignacionesAdministrativas(escuelaActiva.id)
      .then(setDesignaciones)
      .finally(() => setLoading(false));
  }, [escuelaActiva]);

  if (loading) return <p>Cargando designaciones...</p>;

  if (designaciones.length === 0) {
    return <p>No hay designaciones administrativas registradas.</p>;
  }

  console.log(designaciones);

  return (
    <div className="designaciones-admin-list">
      {designaciones.map((designacion) => (
        <DesignacionAdministrativaCard
          key={designacion.id}
          designacion={designacion}
        />
      ))}
    </div>
  );
}
