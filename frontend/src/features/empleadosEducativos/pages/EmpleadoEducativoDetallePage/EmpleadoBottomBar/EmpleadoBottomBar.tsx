import Button from "@/components/Button";
import styles from "./EmpleadoBottomBar.module.scss";

type Props = {
  activo: boolean;
  onCrearCargo: () => void;
  onCrearLicencia: () => void;
  onEditar: () => void;
  onToggleActivo: () => void;
};

export default function EmpleadoBottomBar({
  activo,
  onCrearCargo,
  onCrearLicencia,
  onEditar,
  onToggleActivo,
}: Props) {
  return (
    <div className={styles.bottomBar}>
      <div className={styles.bottomBar__left}>
        <Button variant="secondary" onClick={onCrearCargo} disabled>
          Crear cargo
        </Button>

        <Button variant="secondary" onClick={onCrearLicencia} disabled>
          Crear licencia
        </Button>
      </div>

      <div className={styles.bottomBar__right}>
        <Button
          variant={activo ? "danger" : "success"}
          onClick={onToggleActivo}
        >
          {activo ? "Desactivar" : "Reactivar"}
        </Button>

        <Button onClick={onEditar}>
          Editar
        </Button>
      </div>
    </div>
  );
}