import type { ReactNode } from "react";
import styles from "./SidebarSectionLayout.module.scss";

type Props = {
	title: string;
	subtitle?: string;
	filters?: ReactNode;
	actions?: ReactNode;
};

export default function SidebarSectionLayout({
	title,
	subtitle,
	filters,
	actions,
}: Props) {
	return (
		<div className={styles.sidebar}>
			<div className={styles.sidebar__left}>
				<div className={styles.sidebar__header}>
					<h2 className={styles.sidebar__title}>{title}</h2>
					{subtitle && <p className={styles.sidebar__subtitle}>{subtitle}</p>}
				</div>
			</div>

			{filters && <div className={styles.sidebar__center}>{filters}</div>}
			{actions && <div className={styles.sidebar__right}>{actions}</div>}
		</div>
	);
}
