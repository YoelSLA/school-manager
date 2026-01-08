import { DesignacionCursoCard } from "@/components/cards/DesignacionCard/DesignacionCursoCard";
import { VerCargosDesignacionModal } from "@/components/modals/VerCargosDesignacionModal";
import { useEscuela } from "@/context/EscuelaContext";
import {
  obtenerCursosPorEscuela,
  obtenerDesignacionDetalle,
} from "@/services/designacionesService";
import {
  DesignacionCursoResumenDTO,
  DesignacionDetalleDTO,
} from "@/utils/types/designacion";
import { useEffect, useState } from "react";

export default function DesignacionesCursosListPage() {
  const [designaciones, setDesignaciones] = useState<
    DesignacionCursoResumenDTO[]
  >([]);

  const [detalleSeleccionado, setDetalleSeleccionado] =
    useState<DesignacionDetalleDTO | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadingDetalle, setLoadingDetalle] = useState(false);

  const { escuelaActiva } = useEscuela();

  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      try {
        const data = await obtenerCursosPorEscuela(escuelaActiva!.id);
        setDesignaciones(data);
      } catch (error) {
        console.error("Error al cargar designaciones", error);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  const handleVerCargos = async (designacionId: number) => {
    try {
      setLoadingDetalle(true);
      const detalle = await obtenerDesignacionDetalle(designacionId);
      setDetalleSeleccionado(detalle);
    } catch (error) {
      console.error("Error al cargar detalle de designación", error);
    } finally {
      setLoadingDetalle(false);
    }
  };

  if (loading) {
    return <p className="loading">Cargando cursos...</p>;
  }

  return (
    <>
      <div className="designaciones-cursos-grid">
        {designaciones.map((d) => (
          <DesignacionCursoCard
            key={d.id}
            designacion={d}
            onVerCargos={handleVerCargos}
          />
        ))}
      </div>

      <VerCargosDesignacionModal
        open={!!detalleSeleccionado}
        designacion={detalleSeleccionado}
        onClose={() => setDetalleSeleccionado(null)}
      />

      {loadingDetalle && <p className="loading">Cargando cargos…</p>}
    </>
  );
}
