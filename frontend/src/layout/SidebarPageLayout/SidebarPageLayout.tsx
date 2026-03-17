import type { ReactNode } from "react";
import styles from "./SidebarPageLayout.module.scss";

type Props = {
	sidebar: ReactNode;
	children: ReactNode;
	filters?: ReactNode;
	pagination?: ReactNode;
};

export default function SidebarPageLayout({
	sidebar,
	filters,
	children,
	pagination,
}: Props) {
	return (
		<section className={styles.sidebarPage}>
			<aside className={styles.sidebarPage__sidebar}>{sidebar}</aside>

			{filters && (
				<div className={styles.sidebarPage__filters}>{filters}</div>
			)}

			<div className={styles.sidebarPage__body}>{children}</div>


			<div className={styles.sidebarPage__pagination}>{pagination}</div>

		</section>
	);
}