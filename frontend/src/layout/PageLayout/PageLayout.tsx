import Breadcrumbs from "@/layout/Breadcrumbs/Breadcrumbs";
import styles from "./PageLayout.module.scss";

type Props = {
	children: React.ReactNode;
};

export default function PageLayout({ children }: Props) {
	return (
		<div className={styles["page-layout"]}>
			<div className={styles["page-layout__breadcrumb"]}>
				<Breadcrumbs />
			</div>

			<div className={styles["page-layout__content"]}>{children}</div>
		</div>
	);
}
