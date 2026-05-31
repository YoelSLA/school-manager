import type { ReactNode } from "react";
import styles from "./SidebarPageLayout.module.scss";

type Props = {
	sidebar?: ReactNode;
	content: ReactNode;
};

export default function SidebarPageLayout({ sidebar, content }: Props) {
	return (
		<section className={styles.layout}>
			{sidebar && <aside className={styles.layout__sidebar}>{sidebar}</aside>}

			<main className={styles.layout__content}>{content}</main>
		</section>
	);
}
