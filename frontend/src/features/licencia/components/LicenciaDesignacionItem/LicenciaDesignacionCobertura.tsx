import { CalendarDays, User } from "lucide-react";
import Button from "@/shared/components/Button";
import { formatDate } from "@/shared/utils/date";
import type { LicenciaDesignacionDTO } from "../../types";
import styles from "./LicenciaDesignacionCobertura.module.scss";

type Props = {
  designacion: LicenciaDesignacionDTO;
  onCambiarCobertura: (id: number) => void;
};

export default function LicenciaDesignacionCobertura({
  designacion,
  onCambiarCobertura,
}: Props) {
  const asignacion = designacion.cobertura;

  if (!asignacion) {
    return (
      <section className={styles.cobertura}>
        <div className={styles.main}>
          <User size={16} />
          <span>Sin cobertura asignada</span>
        </div>

        <button
          type="button"
          className={styles.link}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          Cubrir →
        </button>
      </section>
    );
  }

  return (
    <section className={styles.cobertura}>
      <div className={styles.main}>
        <User size={16} />

        <strong>
          {asignacion.empleadoEducativoBasico.apellido},{" "}
          {asignacion.empleadoEducativoBasico.nombre}
        </strong>

        <span>{asignacion.empleadoEducativoBasico.cuil}</span>

        {"fechaHasta" in asignacion.periodo && (
          <>
            <CalendarDays size={16} />

            <span>
              {formatDate(asignacion.periodo.fechaDesde)} →{" "}
              {asignacion.periodo.fechaHasta
                ? formatDate(asignacion.periodo.fechaHasta)
                : "Sin fecha"}
            </span>
          </>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          onCambiarCobertura(designacion.designacionId);
        }}
      >
        Cambiar cobertura
      </Button>
    </section>
  );
}