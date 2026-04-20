import type { ReactNode } from "react";
import styles from "./InfoCard.module.scss";

type Props = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

export default function InfoCard({ icon, title, children }: Props) {
  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        {icon}
        <span>{title}</span>
      </div>

      <div className={styles.cardBody}>{children}</div>
    </section>
  );
}