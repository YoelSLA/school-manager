import TableHeader from "@/shared/components/Table/TableHeader";
import styles from "./LicenciaTableHeader.module.scss";

export default function LicenciaTableHeader() {
	return (
		<TableHeader className={styles.header}>
			<div>Empleado</div>
			<div>Licencia</div>
			<div>Período</div>
			<div>Duración</div>
			<div>Estado</div>
			<div>Acciones</div>
		</TableHeader>
	);
}
