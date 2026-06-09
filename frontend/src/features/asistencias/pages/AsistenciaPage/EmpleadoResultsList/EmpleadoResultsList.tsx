import type { AsistenciaEmpleadoResumenDTO } from "@/shared/types";
import EmpleadoAsistenciaCard from "../../../components/AsistenciaEmpleadoCard/EmpleadoAsistenciaCard";
import styles from "./EmpleadoResultsList.module.scss";

type Props = {
	empleados: AsistenciaEmpleadoResumenDTO[];
	onSelect: (empleado: AsistenciaEmpleadoResumenDTO) => void;
};

export default function EmpleadoResultsList({ empleados, onSelect }: Props) {
	if (empleados.length === 0) {
		return (
			<div className={styles.empty}>
				No se encontraron empleados con los filtros actuales
			</div>
		);
	}
	return (
		<section className={styles.list}>
			{empleados.map((empleado) => (
				<EmpleadoAsistenciaCard
					key={empleado.empleadoBasico.id}
					asistenciaEmpleadoResumen={empleado}
					onSelect={onSelect}
				/>
			))}
		</section>
	);
}
