import { DesignacionCursoCard } from "@/components/cards/DesignacionCursoCard";
import { useEscuela } from "@/context/EscuelaContext";
import { obtenerCursosPorEscuela } from "@/services/designacionesService";
import { DesignacionCursoResumenDTO } from "@/utils/types";
import { useEffect, useState } from "react";
import "./cursos-listar.css";
import DesignacionCursoModal from "./DesignacionCursoModal";

export default function CursosListarPage() {
  const [designaciones, setDesignaciones] = useState<
    DesignacionCursoResumenDTO[]
  >([]);
  const [seleccionada, setSeleccionada] =
    useState<DesignacionCursoResumenDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const { escuelaActiva } = useEscuela();

  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      try {
        const data = await obtenerCursosPorEscuela(escuelaActiva!.id);
        console.log(data, "DATAAAAAAAAAAAAAAAAAAAAAA");
        setDesignaciones(data);
      } catch (error) {
        console.log(designaciones);
        console.error("Error al cargar designaciones", error);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);
  if (loading) {
    return <p className="loading">Cargando cursos...</p>;
  }
  console.log(designaciones, "DESIGNACIOENS DENTRO DEL CURSO");
  return (
    <>
      <div className="designaciones-cursos-grid">
        {designaciones.map((d) => (
          <DesignacionCursoCard
            key={d.cupof}
            designacion={d}
            onClick={() => setSeleccionada(d)}
          />
        ))}
      </div>
      {seleccionada && (
        <DesignacionCursoModal
          designacion={seleccionada}
          onClose={() => setSeleccionada(null)}
        />
      )}
    </>
  );
}
