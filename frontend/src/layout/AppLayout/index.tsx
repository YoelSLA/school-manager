import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./AppLayout.module.scss";

export default function AppLayout() {
	return (
		<div className={styles["app-layout"]}>
			<Header />

			<div className={styles["app-layout__viewport"]}>
				<main className={styles["app-layout__content"]}>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
