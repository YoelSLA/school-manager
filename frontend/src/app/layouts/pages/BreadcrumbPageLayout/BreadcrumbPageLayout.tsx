import type { ReactNode } from "react";
import styles from "./BreadcrumbPageLayout.module.scss";

type Props = {
  children: ReactNode;
  breadcrumbs?: ReactNode;
};

export default function BreadcrumbPageLayout({
  children,
  breadcrumbs,
}: Props) {
  return (
    <section className={styles.layout}>
      {breadcrumbs && (
        <header className={styles.layout__header}>
          {breadcrumbs}
        </header>
      )}

      <main className={styles.layout__content}>
        {children}
      </main>
    </section>
  );
}