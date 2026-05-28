import { User } from "lucide-react";
import styles from "./CoberturaCardEmpty.module.scss";

export default function CoberturaCardEmpty() {
	return (
		<div className={styles.empty}>
			<User size={18} color="#94a3b8" />

			<div>
				<strong>Sin cobertura asignada</strong>

				<span>Todavía no hay ningún empleado cubriendo esta designación.</span>
			</div>
		</div>
	);
}
