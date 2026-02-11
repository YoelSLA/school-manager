import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { EmpleadoEducativoLicenciaItemDTO } from "@/features/empleadosEducativos/types/empleadosEducativos.types";
import EntityList from "../EntityList";
import LicenciaItem from "./LicenciaRow";
import styles from "./LicenciasList.module.scss";

type Props = {
	licencias: EmpleadoEducativoLicenciaItemDTO[];
};

export default function LicenciasList({ licencias }: Props) {
	const navigate = useNavigate();

	const licenciasOrdenadas = useMemo(() => {
		return [...licencias].sort(
			(a, b) =>
				new Date(a.periodo.fechaDesde).getTime() -
				new Date(b.periodo.fechaDesde).getTime(),
		);
	}, [licencias]);

	return (
		<div className={styles.licencias}>
			<EntityList
				title="LICENCIAS"
				items={licenciasOrdenadas}
				maxItems={2}
				emptyText="No registra licencias"
				renderItem={(licencia) => (
					<LicenciaItem key={licencia.id} licencia={licencia} />
				)}
				onViewAll={() => navigate("/empleadoEducativo/123/licencias")}
				viewAllLabel="Ver todas las licencias"
			/>
		</div>
	);
}
