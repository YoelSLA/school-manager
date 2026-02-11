import type { ReactNode } from "react";
import styles from "./SidebarPageLayout.module.scss";

type Props = {
	sidebar: ReactNode;
	children: ReactNode;
};

export default function SidebarPageLayout({ sidebar, children }: Props) {
	return (
		<section className={styles["sidebar-page"]}>
			<aside className={styles["sidebar-page__sidebar"]}>{sidebar}</aside>
			<main className={styles["sidebar-page__content"]}>{children}</main>
		</section>
	);
}
