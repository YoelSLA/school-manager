import type { KeyboardEvent } from "react";
import type { LicenciaDesignacionDTO } from "../../types";
import LicenciaDesignacionCobertura from "./LicenciaDesignacionCobertura";
import LicenciaDesignacionInfo from "./LicenciaDesignacionInfo/LicenciaDesignacionInfo";
import styles from "./LicenciaDesignacionItem.module.scss";

type Props = {
  designacion: LicenciaDesignacionDTO;
  selected: boolean;
  onSelect: (id: number) => void;
  onCubrir: (id: number) => void;
  onCambiarCobertura: () => void;
};

export default function LicenciaDesignacionItem({
  designacion,
  selected,
  onSelect,
  onCubrir,
  onCambiarCobertura,
}: Props) {
  const estaCubierta = designacion.estado === "CUBIERTA";

  function handleSelect() {
    if (!estaCubierta) {
      onSelect(designacion.designacionId);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (estaCubierta) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(designacion.designacionId);
    }
  }

  return (
    <article
      className={`
        ${styles.item}
        ${selected && !estaCubierta ? styles.selected : ""}
        ${estaCubierta ? styles.disabled : ""}
      `}
      tabIndex={estaCubierta ? -1 : 0}
      aria-disabled={estaCubierta}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.designacion}>
        <LicenciaDesignacionInfo designacion={designacion} />
      </div>

      <div className={styles.cobertura}>
        <LicenciaDesignacionCobertura
          designacion={designacion}
          onCubrir={() => onCubrir(designacion.designacionId)}
          onCambiarCobertura={onCambiarCobertura}
        />
      </div>
    </article>
  );
}