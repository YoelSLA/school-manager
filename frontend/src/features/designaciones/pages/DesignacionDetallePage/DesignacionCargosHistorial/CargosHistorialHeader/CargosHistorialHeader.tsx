import FilterPillGroup from "@/components/FilterPillGroup/FilterPillGroup";
import Button from "@/components/Button";
import type { FiltroCargos } from "@/features/asignaciones/types/asignacion.types";
import { FILTROS_CARGOS } from "@/features/asignaciones/utils/asignaciones.utils";
import styles from "./CargosHistorialHeader.module.scss";

type Props = {
  filtro: FiltroCargos;
  onChangeFiltro: (f: FiltroCargos) => void;
  onNuevoCargo: () => void;
};

export default function CargosHistorialHeader({
  filtro,
  onChangeFiltro,
  onNuevoCargo,
}: Props) {
  return (
    <div className={styles.header}>
      <FilterPillGroup<FiltroCargos>
        items={FILTROS_CARGOS}
        value={filtro}
        onChange={onChangeFiltro}
      />

      <Button variant="primary" size="sm" onClick={onNuevoCargo} className={styles.create}>
        Nuevo cargo
      </Button>
    </div>
  );
}
