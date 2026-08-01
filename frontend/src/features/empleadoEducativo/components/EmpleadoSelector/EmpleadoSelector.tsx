import { useEffect, useState } from "react";
import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadosEducativos/types/empleadoEducativo.types";
import EmpleadoAutocompleteBase from "./EmpleadoAutocompleteBase";
import EmpleadoSelected from "./EmpleadoSelected";
import styles from "./EmpleadoSelector.module.scss";

type Props = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultEmpleado?: EmpleadoEducativoBasicoDTO | null;
  onChange?: (empleado: EmpleadoEducativoBasicoDTO | null) => void;
};

export default function EmpleadoSelector({
  label = "Empleado",
  placeholder = "Buscar por apellido o nombre, CUIL",
  disabled,
  defaultEmpleado = null,
  onChange,
}: Props) {
  const [search, setSearch] = useState("");
  const [empleadoSeleccionado, setEmpleadoSeleccionado] =
    useState<EmpleadoEducativoBasicoDTO | null>(defaultEmpleado);

  useEffect(() => {
    setEmpleadoSeleccionado(defaultEmpleado);
  }, [defaultEmpleado]);

  const handleSelect = (
    empleado: EmpleadoEducativoBasicoDTO,
  ) => {
    setEmpleadoSeleccionado(empleado);
    setSearch("");
    onChange?.(empleado);
  };

  const handleRemove = () => {
    setEmpleadoSeleccionado(null);
    setSearch("");
    onChange?.(null);
  };

  return (
    <section className={styles.empleadoSection}>
      <div className={styles.content}>
        <h3 className={styles.title}>{label}</h3>

        <div className={styles.search}>
          <EmpleadoAutocompleteBase
            value={search}
            onChange={setSearch}
            onSelect={handleSelect}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>

        <div className={styles.selected}>
          {empleadoSeleccionado ? (
            <EmpleadoSelected
              empleado={empleadoSeleccionado}
              onRemove={handleRemove}
            />
          ) : (
            <div className={styles.placeholder}>
              Ningún empleado seleccionado
            </div>
          )}
        </div>
      </div>
    </section>
  );
}