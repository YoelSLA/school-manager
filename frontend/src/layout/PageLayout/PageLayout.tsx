import type { ReactNode } from "react";
import styles from "./PageLayout.module.scss";

type Props = {
	breadcrumbs?: ReactNode;
	children: ReactNode;
};

export default function PageLayout({ breadcrumbs, children }: Props) {
	return (
		<section className={styles.pageLayout}>

			{breadcrumbs && (
				<div className={styles.pageLayout__breadcrumbs}>
					{breadcrumbs}
				</div>
			)}

			<main className={styles.pageLayout__content}>
				{children}
			</main>

		</section>
	);
}