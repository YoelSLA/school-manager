import type { ReactNode } from "react";
import styles from "./ListPageLayout.module.scss";

type Props = {
  filters?: ReactNode;
  content: ReactNode;
  pagination?: ReactNode;
};

export default function ListPageLayout({
  filters,
  content,
  pagination,
}: Props) {
  return (
    <section
      className={`${styles.listPage} ${!filters ? styles["listPage--noFilters"] : ""
        }`}
    >

      {filters && (
        <div className={styles.listPage__filters}>
          {filters}
        </div>
      )}

      <main className={styles.listPage__content}>
        {content}
      </main>

      {pagination && (
        <div className={styles.listPage__pagination}>
          {pagination}
        </div>
      )}

    </section>
  );
}