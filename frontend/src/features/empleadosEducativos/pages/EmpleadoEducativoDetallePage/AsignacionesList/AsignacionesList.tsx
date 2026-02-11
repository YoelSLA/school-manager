import { useNavigate } from "react-router-dom";
import type { EmpleadoEducativoAsignacionItemDTO } from "@/features/empleadosEducativos/types/empleadosEducativos.types";
import EntityList from "../EntityList";
import styles from "./AsignacionesList.module.scss";
import AsignacionRow from "./AsignacionRow";

type Props = {
	asignaciones: EmpleadoEducativoAsignacionItemDTO[];
};

export default function AsignacionesList({ asignaciones }: Props) {
	const navigate = useNavigate();

	return (
		<div className={styles.asignaciones}>
			<EntityList
				title="CARGOS"
				items={asignaciones}
				emptyText="No registra cargos"
				maxItems={2}
				renderItem={(asignacion) => (
					<AsignacionRow key={asignacion.id} asignacion={asignacion} />
				)}
				onViewAll={() => navigate("/empleadoEducativo/123/cargos")}
				viewAllLabel="Ver todos los cargos"
			/>
		</div>
	);
}
