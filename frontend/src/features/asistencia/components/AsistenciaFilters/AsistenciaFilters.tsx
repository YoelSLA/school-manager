import {Button} from "@/shared/components";
import type { RolItem } from "../../types";
import styles from "./AsistenciaFilters.module.scss";

type Props = {
  roles: RolItem[];
  onToggle: (rolId: RolItem["id"]) => void;
  onClear: () => void;
};

export default function AsistenciaFilters({
  roles,
  onToggle,
  onClear,
}: Props) {
  const hasFilters = roles.some((rol) => rol.checked);

  return (
    <div className={styles.filtersRow}>
      <div className={styles.filters}>
        <div className={styles.content}>
          <h3>Rol educativo</h3>

          <div className={styles.roles}>
            {roles.map((rol) => (
              <label key={rol.id} className={styles.role}>
                <input
                  type="checkbox"
                  checked={rol.checked}
                  onChange={() => onToggle(rol.id)}
                />

                <span>{rol.label}</span>
                <span>({rol.count})</span>
              </label>
            ))}
          </div>
        </div>

        {hasFilters && (
          <div className={styles.actions}>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}