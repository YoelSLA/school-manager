import { Plus, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import Button from "@/shared/components/Button";
import styles from "./Toolbar.module.scss";

type Props = {
  title: string;
  headerCenter?: ReactNode;
  headerActions?: ReactNode;
  footer?: ReactNode;
  onRefresh?: () => void;
  isFetching?: boolean;
  onCreate?: () => void;
  createLabel?: string;
};

export default function Toolbar({
  title,
  headerCenter,
  headerActions,
  footer,
  onRefresh,
  isFetching = false,
  onCreate,
  createLabel = "Nuevo",
}: Props) {
  return (
    <header className={styles.toolbar}>
      <div className={styles.toolbar__header}>
        <div className={styles.toolbar__title}>
          {title}
        </div>

        <div className={styles.toolbar__headerCenter}>
          {headerCenter}
        </div>

        <div className={styles.toolbar__headerActions}>
          {headerActions}

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
      </div>
      <div className={styles.toolbar__footer}>
        {footer}
      </div>
    </header>
  );
}