import { TableHeader } from "@/shared/components/Table";
import styles from "./AsistenciaTableHeader.module.scss";

export default function AsistenciaTableHeader() {
	return (
		<TableHeader className={styles.header}>
			<span>Empleado</span>
			<span>Roles</span>
			<span>Faltas</span>
			<span>Licencia más frecuente</span>
		</TableHeader>
	);
}
