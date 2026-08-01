import { Briefcase } from "lucide-react";
import BadgeEstadoDesignacion from "@/shared/components/BagdeEstadoDesignacion";
import type { LicenciaDesignacionDTO } from "../../types";
import styles from "./LicenciaDesignacionInfo.module.scss";

type Props = {
  designacion: LicenciaDesignacionDTO;
};

export default function LicenciaDesignacionInfo({
  designacion,
}: Props) {
  return (
    <section className={styles.info}>
      <div className={styles.main}>
        <Briefcase size={16} />

        <strong>{designacion.rolEducativo}</strong>

        <span>CUPOF #{designacion.cupof}</span>

        {designacion.tipo === "CURSO" ? (
          <>
            <span>
              {designacion.curso} · {designacion.materia}
            </span>

            <span>{designacion.orientacion}</span>
          </>
        ) : (
          <span>Designación administrativa</span>
        )}
      </div>

      <BadgeEstadoDesignacion value={designacion.estado} />
    </section>
  );
}