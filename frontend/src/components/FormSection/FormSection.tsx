import type { ReactNode } from "react";
import styles from "./FormSection.module.scss";

type Props = {
  title: string;
  children: ReactNode;
};

export default function FormSection({ title, children }: Props) {
  return (
    <section className={styles.section}>
      <h3 className={styles.section__title}>{title}</h3>
      <div className={styles.section__divider} />
      <div className={styles.section__grid}>{children}</div>
    </section>
  );
}

export { styles as formSectionStyles };
