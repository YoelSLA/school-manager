import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./FormSection.module.scss";

type Layout = "grid" | "column";

type Props = {
  title?: string;
  children: ReactNode;
  layout?: Layout;
  grow?: boolean;
  actions?: ReactNode;
};

export default function FormSection({
  title,
  children,
  layout = "grid",
  grow = false,
  actions,
}: Props) {
  return (
    <section
      className={clsx(
        styles.section,
        grow && styles["section--grow"],
      )}
    >
      {title && (
        <div className={styles.section__header}>
          <div>
            <h3 className={styles.section__title}>
              {title}
            </h3>

            <div className={styles.section__divider} />
          </div>

          {actions && (
            <div className={styles.section__actions}>
              {actions}
            </div>
          )}
        </div>
      )}

      <div
        className={clsx(
          styles.section__content,
          layout === "column" &&
          styles["section__content--column"],
        )}
      >
        {children}
      </div>
    </section>
  );
}