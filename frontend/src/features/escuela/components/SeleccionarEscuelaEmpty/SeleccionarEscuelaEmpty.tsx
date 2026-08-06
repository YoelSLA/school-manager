
import { Button } from "@/shared/components";
import styles from "./SeleccionarEscuelaEmpty.module.scss";

type Props = {
  onCrear: () => void;
};

export default function SeleccionarEscuelaEmpty({ onCrear }: Props) {
  return (
    <div className={styles.empty}>
      <h3 className={styles.empty__title}>No hay escuelas</h3>

      <p className={styles.empty__text}>Creá una escuela para comenzar</p>

      <Button
        onClick={onCrear}
        variant="primary"
        size="sm"
        className={styles.empty__action}
      >
        + Crear escuela
      </Button>
    </div>
  );
}
