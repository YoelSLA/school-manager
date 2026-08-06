import { FILTROS_CARGOS } from "@/features/asignacion/constants";
import type { FiltroCargos } from "@/features/asignacion/types";
import Button from "@/shared/components/Button";
import FilterPillGroup from "@/shared/components/filters/FilterPillGroup/FilterPillGroup";
import styles from "./DesignacionCargosHistorialHeader.module.scss";

type Props = {
  filtro: FiltroCargos;

  onChangeFiltro: (f: FiltroCargos) => void;

  onNuevoCargo: (tipo: "TITULAR" | "PROVISIONAL") => void;
};

export default function DesignacionCargosHistorialHeader({
  filtro,
  onChangeFiltro,
  onNuevoCargo,
}: Props) {
  return (
    <>
      <h3 className={styles.title}>HISTORIAL DE CARGOS</h3>

      <div className={styles.header}>
        <FilterPillGroup<FiltroCargos>
          items={FILTROS_CARGOS}
          value={filtro}
          onChange={onChangeFiltro}
        />

        <Button
          variant="primary"
          size="sm"
          className={styles.create}
          dropdownItems={[
            {
              label: "Titular",

              onClick: () => onNuevoCargo("TITULAR"),
            },
            {
              label: "Provisional",

              onClick: () => onNuevoCargo("PROVISIONAL"),
            },
          ]}
        >
          Nuevo cargo
        </Button>
      </div>
    </>
  );
}
