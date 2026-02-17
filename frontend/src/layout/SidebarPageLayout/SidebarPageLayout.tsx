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
		<section className={styles["sidebar-page"]}>
			<aside className={styles["sidebar-page__sidebar"]}>
				{sidebar}
			</aside>

			<div className={styles["sidebar-page__body"]}>
				<main className={styles["sidebar-page__content"]}>
					{children}
				</main>

				{pagination && (
					<div className={styles["sidebar-page__pagination"]}>
						{pagination}
					</div>
				)}
			</div>
		</section>
	);
}