import { ChevronRight } from "lucide-react";
import styles from "./DesignacionCardActions.module.scss";

export default function DesignacionCardActions() {
	return (
		<footer className={styles.actions}>
			<span className={styles.link}>
				Ver detalle
				<ChevronRight size={14} strokeWidth={2} className={styles.icon} />
			</span>
		</footer>
	);
}
