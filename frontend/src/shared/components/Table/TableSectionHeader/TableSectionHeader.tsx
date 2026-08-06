import type { ReactNode } from "react";
import styles from "./TableSectionHeader.module.scss";

type Props = {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
};

export default function SectionHeader({
  title,
  subtitle,
  badge,
}: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {subtitle && (
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        )}
      </div>

      {badge && (
        <div className={styles.badge}>
          {badge}
        </div>
      )}
    </header>
  );
}