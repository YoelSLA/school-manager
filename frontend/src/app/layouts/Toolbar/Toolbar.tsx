import { Plus, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import Button from "@/components/Button";
import styles from "./Toolbar.module.scss";

type Props = {
  title: string;

  center?: ReactNode;
  filters?: ReactNode;
  actions?: ReactNode;

  onRefresh?: () => void;
  isFetching?: boolean;

  onCreate?: () => void;
  createLabel?: string;
};

export default function Toolbar({
  title,
  center,
  filters,
  actions,
  onRefresh,
  isFetching,
  onCreate,
  createLabel = "Nuevo",
}: Props) {
  return (
    <section className={styles.toolbar}>
      <div className={styles.toolbar__title}>
        {title}
      </div>

      <div className={styles.toolbar__center}>
        {center}
        {filters}
      </div>

      <div className={styles.toolbar__actions}>
        {actions}

        {onRefresh && (
          <Button
            variant="secondary"
            onClick={onRefresh}
            disabled={isFetching}
          >
            <span className={styles.toolbar__button}>
              <RefreshCw
                size={16}
                className={isFetching ? styles.toolbar__spin : ""}
              />
              Actualizar
            </span>
          </Button>
        )}

        {onCreate && (
          <Button onClick={onCreate}>
            <span className={styles.toolbar__button}>
              <Plus size={16} />
              {createLabel}
            </span>
          </Button>
        )}
      </div>
    </section>
  );
}