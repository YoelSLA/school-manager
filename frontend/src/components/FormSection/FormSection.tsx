import type { ReactNode } from "react";
import styles from "./FormSection.module.scss";

type Layout = "grid" | "column";

type Props = {
  title: string;
  children: ReactNode;
  layout?: Layout;
};

export default function FormSection({
  title,
  children,
  layout = "grid",
}: Props) {
  return (
    <section className={styles.section}>
      <h3 className={styles.section__title}>{title}</h3>
      <div className={styles.section__divider} />
      <div
        className={`${styles.section__content} ${layout === "column" ? styles["section__content--column"] : ""
          }`}
      >
        {children}
      </div>
    </section>
  );
}
