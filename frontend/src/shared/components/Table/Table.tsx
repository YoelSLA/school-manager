import type { ReactNode } from "react";
import styles from "./Table.module.scss";

type Props = {
  header: ReactNode;
  children: ReactNode;
};

export default function Table({ header, children }: Props) {
  return (
    <div className={styles.table}>
      {header}
      {children}
    </div>
  );
}