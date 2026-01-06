import AsignacionRow from "@/components/AsignacionRow";
import { useEscuela } from "@/context/EscuelaContext";
import { obtenerDesignacionAdministrativaCompleta } from "@/services/designacionesService";
import { DesignacionAdministrativaCompletaDTO } from "@/utils/types";
import { useEffect, useState } from "react";
import CrearAsignacionModal from "./CrearAsignacionModal";
import "./designacionAdministrativaCargosModal.css";

type Props = {
  designacionId: number;
  onClose: () => void;
};

export default function DesignacionAdministrativaCargosModal({
  designacionId,
  onClose,
}: Props) {
  const { escuelaActiva } = useEscuela();

  const [data, setData] = useState<DesignacionAdministrativaCompletaDTO | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [openCrear, setOpenCrear] = useState(false);

  const cargarDesignacion = () => {
    setLoading(true);

    obtenerDesignacionAdministrativaCompleta(escuelaActiva!.id, designacionId)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargarDesignacion();
  }, [designacionId, escuelaActiva]);

  useEffect(() => {
    setLoading(true);

    obtenerDesignacionAdministrativaCompleta(escuelaActiva!.id, designacionId)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [designacionId, escuelaActiva]);

  return (
    <>
      {/* MODAL PRINCIPAL */}
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {/* =====================
            HEADER
        ===================== */}
          <div className="modal-header">
            <div className="designacion-info">
              {data && (
                <>
                  <div className="cupof-big">#{data.cupof}</div>
                  <div className="rol-sub">{data.rolEducativo}</div>
                </>
              )}
            </div>

            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          {/* =====================
            BODY
        ===================== */}
          <div className="modal-body">
            {loading && <p className="loading">Cargando asignaciones…</p>}

            {!loading && data && (
              <>
                {data.asignaciones.length === 0 && (
                  <p className="empty">No hay asignaciones registradas</p>
                )}

                {data.asignaciones.length > 0 && (
                  <div className="asignaciones-table">
                    <div className="asignacion-row">
                      <span>CUIL</span>
                      <span>Apellido, Nombre</span>
                      <span>Situación</span>
                      <span>Fecha Toma Posesión</span>
                      <span>Fecha Cese</span>
                      <span>Vigente</span>
                      <span>Licencia</span>
                      <span>Cubierta</span>
                    </div>

                    {data.asignaciones.map((a) => (
                      <AsignacionRow key={a.id} asignacion={a} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* =====================
            FOOTER
        ===================== */}
          <div className="modal-footer">
            <button
              className="crear-cargo-btn"
              onClick={() => setOpenCrear(true)}
            >
              + Crear cargo
            </button>
          </div>
        </div>
      </div>

      {/* =====================
        MODAL SUPERIOR
    ===================== */}
      {openCrear && (
        <CrearAsignacionModal
          designacionId={designacionId}
          onClose={() => setOpenCrear(false)}
          onCreated={() => {
            setOpenCrear(false);
            cargarDesignacion(); // 🔥 REFRESH
          }}
        />
      )}
    </>
  );
}
