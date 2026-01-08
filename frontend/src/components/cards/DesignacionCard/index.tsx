import "./DesignacionCard.css";

type Props = {
  cupof: number;
  estaCubierta: boolean;
  pendientePorLicencia: boolean;
  tieneAsignacionActiva: boolean;
  franjasCount: number;
  onVerDetalle: () => void;
  children: React.ReactNode;
};

export function DesignacionCard({
  cupof,
  estaCubierta,
  pendientePorLicencia,
  tieneAsignacionActiva,
  franjasCount,
  onVerDetalle,
  children,
}: Props) {
  const estado = getEstadoDesignacion(
    estaCubierta,
    pendientePorLicencia,
    tieneAsignacionActiva
  );

  return (
    <article className="designacion-card">
      {/* HEADER */}
      <header className="designacion-card__header">
        <span className="designacion-card__cupof">#{cupof}</span>

        <span className={`designacion-card__estado ${estado.className}`}>
          {estado.label}
        </span>
      </header>

      {/* BLOQUE ESPECÍFICO */}
      <section className="designacion-card__body">{children}</section>

      {/* FRANJAS HORARIAS */}
      <section className="designacion-card__horarios">
        ⏱ {franjasCount} franja{franjasCount !== 1 ? "s" : ""} horaria
        {franjasCount !== 1 ? "s" : ""}
      </section>

      {/* ACCIÓN ÚNICA */}
      <footer className="designacion-card__actions">
        <button className="btn-ver-detalle" onClick={onVerDetalle}>
          Ver detalle
        </button>
      </footer>
    </article>
  );
}

/* ===============================
   Utils
================================ */
function getEstadoDesignacion(
  estaCubierta: boolean,
  pendientePorLicencia: boolean,
  tieneAsignacionActiva: boolean
) {
  if (estaCubierta) {
    return { label: "Cubierta", className: "cubierta" };
  }

  if (pendientePorLicencia) {
    return { label: "Licencia", className: "pendiente" };
  }

  return { label: "Vacante", className: "vacante" };
}
