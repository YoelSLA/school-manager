import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./AsignacionRowLayout.module.scss";

type Props = {
	variant: "curso" | "administrativa";
	title: ReactNode;
	status?: ReactNode;
	subtitle?: ReactNode;
	footer?: ReactNode;
};

export default function AsignacionRowLayout({
	variant,
	title,
	status,
	subtitle,
	footer,
}: Props) {
	return (
		<div className={clsx(styles.row, styles[`row--${variant}`])}>
			<div className={styles.header}>
				<div className={styles.title}>{title}</div>

				{status && <div className={styles.status}>{status}</div>}
			</div>

			{subtitle && <div className={styles.subtitle}>{subtitle}</div>}

			{footer && <div className={styles.footer}>{footer}</div>}
		</div>
	);
}
