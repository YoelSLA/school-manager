import type { ReactNode } from "react";
import Pagination from "@/shared/components/Pagination";
import styles from "./ToolbarPageLayout.module.scss";

type Props = {
  children: ReactNode;
  toolbar?: ReactNode;
  showToolbar?: boolean;

  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
};

export default function ToolbarPageLayout({
  children,
  toolbar,
  showToolbar = true,
  page,
  totalPages,
  onPageChange,
}: Props) {
  const showPagination =
    page !== undefined &&
    totalPages !== undefined &&
    onPageChange !== undefined;

  return (
    <section className={styles.layout}>
      {showToolbar && toolbar && (
        <header className={styles.layout__header}>
          {toolbar}
        </header>
      )}

      <main className={styles.layout__content}>
        {children}
      </main>

      {showPagination && (
        <footer className={styles.layout__footer}>
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={onPageChange}
          />
        </footer>
      )}
    </section>
  );
}