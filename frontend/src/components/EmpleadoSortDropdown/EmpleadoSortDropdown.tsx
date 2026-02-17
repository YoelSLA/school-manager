import { useEffect, useRef, useState } from "react";
import styles from "./EmpleadoSortDropdown.module.scss";
import type { SortDirection, SortState } from "@/utils/types";
import SortGroup from "./EmpleadoSortField";

type Props = {
  value: SortState;
  onChange: (value: SortState) => void;
};

export default function EmpleadoSortDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const _hasActiveSort =
    value.nombre || value.apellido || value.fechaDeIngreso;

  const handleChange = (
    field: keyof SortState,
    direction: SortDirection
  ) => {
    onChange({
      ...value,
      [field]: direction,
    });
  };

  const handleClear = () => {
    onChange({});
    setOpen(false);
  };

  const activeCount = Object.values(value).filter(Boolean).length;

  // cerrar al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.sort} ref={ref}>
      <button
        type="button"
        className={`${styles.sort__trigger} ${activeCount ? styles["sort__trigger--active"] : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        Ordenar por {activeCount ? `(${activeCount})` : ""} ▾
      </button>

      {open && (
        <div className={styles.sort__menu}>
          <SortGroup
            title="Nombre"
            value={value.nombre}
            onChange={(dir) => handleChange("nombre", dir)}
            ascLabel="Ascendente"
            descLabel="Descendente"
          />

          <SortGroup
            title="Apellido"
            value={value.apellido}
            onChange={(dir) => handleChange("apellido", dir)}
            ascLabel="Ascendente"
            descLabel="Descendente"
          />

          <SortGroup
            title="Fecha de ingreso"
            value={value.fechaDeIngreso}
            onChange={(dir) =>
              handleChange("fechaDeIngreso", dir)
            }
            ascLabel="Más antigua"
            descLabel="Más reciente"
          />

          {/* BOTÓN LIMPIAR */}

          <div className={styles.sort__footer}>
            <button
              type="button"
              className={styles.sort__clear}
              onClick={handleClear}
            >
              Limpiar orden
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

