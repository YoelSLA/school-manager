import type { ReactNode } from "react";
import Breadcrumbs from "@/shared/components/Breadcrumbs";
import styles from "./BreadcrumbPageLayout.module.scss";

type Props = {
  children: ReactNode;
  showBreadcrumbs?: boolean;
};

export default function BreadcrumbPageLayout({
  children,
  showBreadcrumbs = true,
}: Props) {
  return (
    <section className={styles.layout}>
      {showBreadcrumbs && (
        <header className={styles.layout__header}>
          <Breadcrumbs />
        </header>
      )}

      <main className={styles.layout__content}>
        {children}
      </main>
    </section>
  );
}