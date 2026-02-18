import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./AppLayout.module.scss";

export default function AppLayout() {
	return (
		<div className={styles.appLayout}>
			<div className={styles.appLayout__header}>
				<Header />
			</div>

			<main className={styles.appLayout__content}>
				<Outlet />
			</main>
		</div>
	);
}
