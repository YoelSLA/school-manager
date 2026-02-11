import type { ReactNode } from "react";
import styles from "./ScrollableGridListLayout.module.scss";

type Props = {
	children: ReactNode;
};

export default function ScrollableGridListLayout({ children }: Props) {
	return (
		<section className={styles["list-layout"]}>
			<div className={styles["list-layout__scroll"]}>
				<div className={styles["list-layout__grid"]}>{children}</div>
			</div>
		</section>
	);
}
