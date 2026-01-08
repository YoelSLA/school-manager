import { useEffect, useState } from "react";

import { useEscuela } from "@/context/EscuelaContext";
import {
  listarDesignacionesAdministrativas,
  obtenerDesignacionDetalle,
} from "@/services/designacionesService";

import {
  DesignacionAdministrativaResumenDTO,
  DesignacionDetalleDTO,
} from "@/utils/types/designacion";

import DesignacionAdministrativaCard from "@/components/cards/DesignacionCard/DesignacionAdministrativaCard";
import { VerCargosDesignacionModal } from "@/components/modals/VerCargosDesignacionModal";
import "./designacionesAdministrativasListPage.css";

export default function DesignacionesAdministrativasListPage() {
  const { escuelaActiva } = useEscuela();

  /* ===============================
     STATE
  ================================ */
  const [designaciones, setDesignaciones] = useState<
    DesignacionAdministrativaResumenDTO[]
  >([]);

  const [detalleSeleccionado, setDetalleSeleccionado] =
    useState<DesignacionDetalleDTO | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingDetalle, setLoadingDetalle] = useState(false);

  /* ===============================
     FETCH LISTA
  ================================ */
  useEffect(() => {
    if (!escuelaActiva) return;

    setLoading(true);

    listarDesignacionesAdministrativas(escuelaActiva.id)
      .then(setDesignaciones)
      .finally(() => setLoading(false));
  }, [escuelaActiva]);

  /* ===============================
     VER CARGOS
  ================================ */
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

  /* ===============================
     RENDER
  ================================ */
  if (loading) {
    return <p>Cargando designaciones…</p>;
  }

  if (designaciones.length === 0) {
    return <p>No hay designaciones administrativas registradas.</p>;
  }

  return (
    <>
      {/* ===============================
          LISTA
      ================================ */}
      <div className="designaciones-admin-list">
        {designaciones.map((designacion) => (
          <DesignacionAdministrativaCard
            key={designacion.id}
            designacion={designacion}
            onVerDetalle={handleVerCargos}
          />
        ))}
      </div>

      {/* ===============================
          MODAL DETALLE
      ================================ */}
      <VerCargosDesignacionModal
        open={!!detalleSeleccionado}
        designacion={detalleSeleccionado}
        onClose={() => setDetalleSeleccionado(null)}
      />

      {loadingDetalle && <p className="loading">Cargando cargos…</p>}
    </>
  );
}
