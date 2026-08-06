import type { ReactNode } from "react";

import Button from "@/shared/components/Button";
import styles from "./ListContainer.module.scss";

type Props<T> = {
  isLoading?: boolean;
  isError?: boolean;
  items: T[];

  loadingMessage?: string;
  emptyMessage?: string;
  errorMessage?: string;

  onRetry?: () => void;

  renderItem: (item: T, index: number) => ReactNode;
  getKey?: (item: T, index: number) => React.Key;
};

export default function ListContainer<T>({
  isLoading = false,
  isError = false,
  items,
  loadingMessage = "Cargando…",
  emptyMessage = "No hay datos.",
  errorMessage = "Ocurrió un error.",
  onRetry,
  renderItem,
  getKey,
}: Props<T>) {
  const renderState = (message: ReactNode) => (
    <div className={styles.listState}>{message}</div>
  );

  if (isLoading) {
    return renderState(loadingMessage);
  }

  if (isError) {
    return (
      <div className={styles.state}>
        {renderState(errorMessage)}

        {onRetry && (
          <Button size="sm" onClick={onRetry}>
            Reintentar
          </Button>
        )}
      </div>
    );
  }

  if (items.length === 0) {
    return renderState(emptyMessage);
  }

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {items.map((item, index) => (
          <div key={getKey ? getKey(item, index) : index}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}