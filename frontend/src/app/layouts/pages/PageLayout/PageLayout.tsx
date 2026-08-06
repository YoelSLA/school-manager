import type { ReactNode } from "react";
import styles from "./PageLayout.module.scss";

type Props = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

export default function PageLayout({
  children,
  header,
  footer,
}: Props) {
  return (
    <section className={styles.layout}>
      {header && (
        <header className={styles.layout__header}>
          {header}
        </header>
      )}

      <main className={styles.layout__content}>
        {children}
      </main>

      {footer && (
        <footer className={styles.layout__footer}>
          {footer}
        </footer>
      )}
    </section>
  );
}