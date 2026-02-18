import type { ReactNode } from "react";
import styles from "./SidebarPageLayout.module.scss";

type Props = {
	sidebar: ReactNode;
	children: ReactNode;
	pagination?: ReactNode;
};

export default function SidebarPageLayout({
	sidebar,
	children,
	pagination,
}: Props) {
	return (
		<section className={styles.sidebarPage}>
			<aside className={styles.sidebarPage__sidebar}>
				{sidebar}
			</aside>
			<main className={styles.sidebarPage__content}>
				{children}
			</main>
			<div className={styles.sidebarPage__pagination}>
				{pagination}
			</div>
		</section>
	);
}
