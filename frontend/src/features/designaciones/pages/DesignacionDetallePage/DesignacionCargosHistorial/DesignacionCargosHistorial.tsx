import type {
  AsignacionDetalleDTO,
  FiltroCargos,
} from "@/features/asignaciones/types/asignacion.types";

import styles from "./DesignacionCargosHistorial.module.scss";
import CargosHistorialHeader from "./CargosHistorialHeader";
import CargosHistorialContent from "./CargosHistorialContent";


type Props = {
  cargos: AsignacionDetalleDTO[];
  isLoading?: boolean;
  filtro: FiltroCargos;
  onChangeFiltro: (f: FiltroCargos) => void;
  onNuevoCargo: () => void;
};

export default function DesignacionCargosHistorial({
  cargos,
  isLoading = false,
  filtro,
  onChangeFiltro,
  onNuevoCargo,
}: Props) {
  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <CargosHistorialHeader
          filtro={filtro}
          onChangeFiltro={onChangeFiltro}
          onNuevoCargo={onNuevoCargo}
        />
      </div>

      <div className={styles.content}>
        <CargosHistorialContent
          cargos={cargos}
          filtro={filtro}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}

