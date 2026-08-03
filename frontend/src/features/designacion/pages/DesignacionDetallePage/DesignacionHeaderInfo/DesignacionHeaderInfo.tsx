import { BadgeEstadoDesignacion, BadgeRolEducativo } from "@/shared/components";
import type { DesignacionDetalleDTO } from "../../../types";
import styles from "./DesignacionHeaderInfo.module.scss";

type Props = {
  designacion: DesignacionDetalleDTO;
};

export default function DesignacionHeaderInfo({ designacion }: Props) {
  const { rolEducativo, cupof, estadoDesignacion } = designacion;

  return (
    <section className={styles.designacionHeaderInfo}>
      <div className={styles.designacionHeaderInfoTop}>
        <span className={styles.designacionHeaderInfoCupof}>#{cupof}</span>

        <div className={styles.designacionHeaderInfoCenter}>
          <BadgeRolEducativo rolEducativo={rolEducativo} />
        </div>

        <div className={styles.designacionHeaderInfoActions}>
          <BadgeEstadoDesignacion value={estadoDesignacion} />
        </div>
      </div>
    </section>
  );
}
