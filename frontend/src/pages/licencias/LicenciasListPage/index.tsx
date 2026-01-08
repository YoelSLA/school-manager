import { LicenciaCard } from "@/components/cards/LicenciaCard";
import { DesignacionesLicenciaModal } from "@/components/modals/DesignacionesLicenciaModal";
import { useEscuela } from "@/context/EscuelaContext";
import {
  getAsignacionesActivasPorEmpleado,
  getLicenciasPorEscuela,
} from "@/services/licenciasService";
import { AsignacionDetalleDTO, LicenciaResponseDTO } from "@/utils/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LicenciasListPage() {
  const navigate = useNavigate();
  const { escuelaActiva } = useEscuela();

  const [licencias, setLicencias] = useState<LicenciaResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [licenciaActiva, setLicenciaActiva] = useState<number | null>(null);
  const [asignaciones, setAsignaciones] = useState<AsignacionDetalleDTO[]>([]);

  useEffect(() => {
    if (!escuelaActiva) return;

    setLoading(true);
    getLicenciasPorEscuela(escuelaActiva.id)
      .then(setLicencias)
      .catch(() => setError("No se pudieron cargar las licencias"))
      .finally(() => setLoading(false));
  }, [escuelaActiva?.id]);

  const abrirDesignaciones = (licencia: LicenciaResponseDTO) => {
    setLicenciaActiva(licencia.id);

    getAsignacionesActivasPorEmpleado(licencia.empleado.id).then(
      setAsignaciones
    );
  };

  return (
    <div className="licencias-page">
      {!loading && licencias.length > 0 && (
        <div className="licencias-list">
          {licencias.map((licencia) => (
            <LicenciaCard
              key={licencia.id}
              licencia={licencia}
              onVerDesignaciones={() => abrirDesignaciones(licencia)}
            />
          ))}
        </div>
      )}

      <DesignacionesLicenciaModal
        open={licenciaActiva !== null}
        empleadoId={
          licencias.find((l) => l.id === licenciaActiva)?.empleado.id!
        }
        asignaciones={asignaciones}
        onClose={() => setLicenciaActiva(null)}
        onCubrir={(id) => console.log("Cubrir", id)}
      />
    </div>
  );
}
