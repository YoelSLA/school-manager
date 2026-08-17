import { Briefcase } from "lucide-react";
import { BadgeEstadoDesignacion } from "@/shared/components/Badge";
import type { LicenciaDesignacionDTO } from "../../../types";
import styles from "./LicenciaDesignacionInfo.module.scss";

type Props = {
  designacion: LicenciaDesignacionDTO;
};

export default function LicenciaDesignacionInfo({
  designacion,
}: Props) {
  const esCurso = designacion.tipo === "CURSO";

  return (
    <section className={styles.info}>
      <div className={styles.icon}>
        <Briefcase size={17} />
      </div>

      <div className={styles.content}>
        <div className={styles.title}>
          <strong>{designacion.rolEducativo}</strong>

          <span>CUPOF #{designacion.cupof}</span>
        </div>

        <div className={styles.details}>
          {esCurso ? (
            <>
              <span>
                {designacion.curso} · {designacion.materia}
              </span>

              <span className={styles.separator}>·</span>

              <span>{designacion.orientacion}</span>
            </>
          ) : (
            <span>Designación administrativa</span>
          )}
        </div>
      </div>

      <BadgeEstadoDesignacion value={designacion.estado} />
    </section>
  );
}