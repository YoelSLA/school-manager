import type { EmpleadoAsistenciaDTO } from "@/features/asistencias/types/asistencias.types";
import EmpleadoAsistenciaCard from "./EmpleadoAsistenciaCard";
import styles from "./EmpleadoResultsList.module.scss";

type Props = {
	empleados: EmpleadoAsistenciaDTO[];
	onSelect: (empleado: EmpleadoAsistenciaDTO) => void;
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
					key={empleado.id}
					empleado={empleado}
					onSelect={onSelect}
				/>
			))}
		</section>
	);
}
