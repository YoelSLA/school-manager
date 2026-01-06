import { useEscuela } from "@/context/EscuelaContext";
import { getLicenciasPorEscuela } from "@/services/licenciasService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LicenciaCard } from "../../components/cards/LicenciaCard";
import { LicenciaResponseDTO } from "../../utils/types";
import { LicenciaCardSkeleton } from "./LicenciaCardSkeleton";
import { LicenciasEmptyState } from "./LicenciasEmptyState";
import "./LicenciasListPage.css";

export default function LicenciasListPage() {
  const navigate = useNavigate();

  const { escuelaActiva } = useEscuela();

  const [licencias, setLicencias] = useState<LicenciaResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getLicenciasPorEscuela(escuelaActiva!.id)
      .then(setLicencias)
      .catch(() => {
        setError("No se pudieron cargar las licencias");
      })
      .finally(() => setLoading(false));
  }, [escuelaActiva!.id]);

  return (
    <div className="licencias-page">
      {/* LOADING */}
      {loading && (
        <div className="licencias-list">
          {Array.from({ length: 4 }).map((_, i) => (
            <LicenciaCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* EMPTY */}
      {!loading && licencias.length === 0 && (
        <LicenciasEmptyState
          onCrearLicencia={() => navigate("/licencias/solicitar")}
        />
      )}

      {/* LISTADO */}
      {!loading && licencias.length > 0 && (
        <div className="licencias-list">
          {licencias.map((licencia) => (
            <LicenciaCard key={licencia.id} licencia={licencia} />
          ))}
        </div>
      )}
    </div>
  );
}
