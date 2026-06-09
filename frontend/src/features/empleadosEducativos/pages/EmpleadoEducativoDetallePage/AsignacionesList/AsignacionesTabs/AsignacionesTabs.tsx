import clsx from "clsx";
import type { Tab } from "@/shared/types";
import styles from "./AsignacionesTabs.module.scss";

type Props = {
	activeTab: Tab;
	onChange: (tab: Tab) => void;
	docentesCount: number;
	administrativosCount: number;
};

export default function AsignacionesTabs({
	activeTab,
	onChange,
	docentesCount,
	administrativosCount,
}: Props) {
	return (
		<div className={styles.tabs}>
			<button
				type="button"
				onClick={() => onChange("DOCENTE")}
				className={clsx(styles.tab, {
					[styles.tabActive]: activeTab === "DOCENTE",
				})}
			>
				<span>Docentes</span>

				<span className={styles.count}>{docentesCount}</span>
			</button>

			<button
				type="button"
				onClick={() => onChange("ADMINISTRATIVO")}
				className={clsx(styles.tab, {
					[styles.tabActive]: activeTab === "ADMINISTRATIVO",
				})}
			>
				<span>Administrativos</span>

				<span className={styles.count}>{administrativosCount}</span>
			</button>
		</div>
	);
}
