import { MoreVertical } from "lucide-react";
import { EmpleadoInfo } from "@/features/empleadoEducativo/components";
import { PeriodoDisplay } from "@/shared/components";
import { BadgeEstadoLicencia } from "@/shared/components/Badge";
import { TableRow } from "@/shared/components/Table";
import type { LicenciaRowDTO } from "../../../types";
import styles from "./LicenciaTableRow.module.scss";

type Props = {
	licencia: LicenciaRowDTO;
	onVerDetalle: (licencia: LicenciaRowDTO) => void;
	onDelete?: () => void;
};

export default function LicenciaRow({
	licencia,
	onVerDetalle,
	onDelete,
}: Props) {
	return (
		<TableRow className={styles.row} onOpen={() => onVerDetalle(licencia)}>
			{/* EMPLEADO */}
			<div className={styles.employee}>
				<EmpleadoInfo empleado={licencia.empleado} />
			</div>

			{/* LICENCIA */}
			<div className={styles.licencia}>
				<span className={styles.codigo}>
					{licencia.licenciaEstatutaria.codigo}
				</span>
			</div>

			{/* PERÍODO */}
			<div className={styles.periodo}>
				<PeriodoDisplay periodo={licencia.periodo} showDuration={false} />
			</div>

			{/* DÍAS */}
			<div className={styles.dias}>
				<span>{licencia.periodo.dias}</span>
				<span className={styles.diasLabel}>días</span>
			</div>

			{/* ESTADO */}
			<div className={styles.estado}>
				<BadgeEstadoLicencia value={licencia.estadoLicencia} />
			</div>

			{/* ACCIONES */}
			<button
				type="button"
				className={styles.actions}
				onClick={(e) => {
					e.stopPropagation();
					onDelete?.();
				}}
			>
				<MoreVertical size={18} />
			</button>
		</TableRow>
	);
}
