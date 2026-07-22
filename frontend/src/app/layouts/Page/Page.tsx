import type { ReactNode } from "react";
import styles from "./Page.module.scss";

type Props = {
  children: ReactNode;
};

export default function Page({ children }: Props) {
  return (
    <main className={styles.page}>
      {children}
    </main>
  );
}