import type { ReactNode } from "react";
import styles from "./ScrollableGridListLayout.module.scss";

type Props = {
	children: ReactNode;
};

export default function ScrollableGridListLayout({ children }: Props) {
	return (
		<section className={styles.listLayout}>
			<div className={styles.listLayout__grid}>
				{children}
			</div>
		</section>
	);
}
