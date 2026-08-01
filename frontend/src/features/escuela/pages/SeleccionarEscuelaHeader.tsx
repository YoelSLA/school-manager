
import Button from "@/shared/components/Button";
import styles from "./SeleccionarEscuelaHeader.module.scss";

type Props = {
  onCrear: () => void;
  onRefresh: () => void;
  isLoading: boolean;
};

export function SeleccionarEscuelaHeader({
  onCrear,
  onRefresh,
  isLoading,
}: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <h1 className={styles.header__title}>Seleccionar escuela</h1>

        <p className={styles.header__subtitle}>
          Elegí una escuela para continuar o administrá las existentes
        </p>
      </div>

      <div className={styles.header__actions}>
        <Button
          onClick={onRefresh}
          disabled={isLoading}
          variant="secondary"
          size="sm"
          className={styles.header__refresh}
        >
          🔄 {isLoading ? "Actualizando…" : "Actualizar"}
        </Button>

        <Button
          onClick={onCrear}
          variant="primary"
          size="sm"
          className={styles.header__create}
        >
          + Crear escuela
        </Button>
      </div>
    </header>
  );
}
