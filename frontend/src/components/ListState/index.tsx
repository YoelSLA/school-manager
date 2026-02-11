import type { ReactNode } from "react";
import styles from "./ListState.module.scss";

type Props = {
	children: ReactNode;
};

export default function ListState({ children }: Props) {
	return <div className={styles["list-state"]}>{children}</div>;
}
