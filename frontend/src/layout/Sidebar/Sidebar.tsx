import type { ReactNode } from "react";
import Button from "@/components/Button";
import { RefreshCw, Plus } from "lucide-react";
import styles from "./Sidebar.module.scss";

type Props = {
  title: string;
  subtitle?: string;

  filters?: ReactNode;
  controls?: ReactNode;

  // 🔥 NUEVO
  onRefresh?: () => void;
  isFetching?: boolean;

  onCreate?: () => void;
  createLabel?: string;
};

export default function Sidebar({
  title,
  subtitle,
  filters,
  controls,
  onRefresh,
  isFetching,
  onCreate,
  createLabel = "Nuevo",
}: Props) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__left}>
        <div className={styles.sidebar__header}>
          <h2 className={styles.sidebar__title}>{title}</h2>
          {subtitle && (
            <p className={styles.sidebar__subtitle}>{subtitle}</p>
          )}
        </div>
      </div>

      <div className={styles.sidebar__center}>
        {filters}
        {controls}
      </div>

      <div className={styles.sidebar__right}>
        {/* 🔄 REFRESH (siempre secondary) */}
        {onRefresh && (
          <Button
            variant="secondary"
            onClick={onRefresh}
            disabled={isFetching}
          >
            <span className={styles.sidebar__content}>
              <RefreshCw
                size={16}
                className={isFetching ? styles.sidebar__spin : ""}
              />
              <span>Actualizar</span>
            </span>
          </Button>
        )}

        {/* ➕ CREATE (siempre primary) */}
        {onCreate && (
          <Button onClick={onCreate}>
            <span className={styles.sidebar__content}>
              <Plus size={16} />
              <span>{createLabel}</span>
            </span>
          </Button>
        )}
      </div>
    </div>
  );
}