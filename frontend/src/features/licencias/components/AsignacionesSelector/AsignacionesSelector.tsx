import DesignacionAdministrativaRow from "@/features/licencias/components/DesignacionAdministrativaRow";
import DesignacionCursoRow from "@/features/licencias/components/DesignacionCursoRow";
import type { AsignacionLicenciaDTO } from "@/shared/types";
import styles from "./AsignacionesSelector.module.scss";

type Props = {
  asignaciones: AsignacionLicenciaDTO[];
  loading: boolean;
  value: number[];
  onChange: (ids: number[]) => void;
  error?: string;
};

export default function AsignacionesSelector({
  asignaciones,
  loading,
  value,
  onChange,
  error,
}: Props) {
  const toggle = (id: number) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  if (loading) {
    return (
      <div className={styles.selector}>
        <h3 className={styles.title}>CARGOS</h3>
        <p className={styles.state}>Cargando designaciones...</p>
      </div>
    );
  }

  if (!asignaciones.length) {
    return (
      <div className={styles.selector}>
        <h3 className={styles.title}>CARGOS</h3>
        <p className={styles.state}>No hay cargos activos.</p>
      </div>
    );
  }

  return (
    <div className={styles.selector}>
      <h3 className={styles.title}>CARGOS</h3>

      <div className={styles.list}>
        {asignaciones.map((a) => {
          const checked = value.includes(a.id);

          if (a.tipo === "CURSO") {
            return (
              <DesignacionCursoRow
                key={a.id}
                asignacion={a}
                checked={checked}
                onToggle={toggle}
              />
            );
          }

          return (
            <DesignacionAdministrativaRow
              key={a.id}
              asignacion={a}
              checked={checked}
              onToggle={toggle}
            />
          );
        })}
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}