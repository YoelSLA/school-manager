import { Building2 } from "lucide-react";
import type { AsignacionLicenciaAdministrativaDTO } from "@/features/asignacion/types";
import { BadgeRolEducativo } from "@/shared/components/Badge";
import LicenciaDesignacionRow from "../LicenciaDesignacionRow";
import styles from "./LicenciaDesignacionAdministrativaRow.module.scss";

type Props = {
	asignacion: AsignacionLicenciaAdministrativaDTO;
	checked: boolean;
	onToggle: (id: number) => void;
};

export default function LicenciaDesignacionAdministrativaRow({
	asignacion,
	checked,
	onToggle,
}: Props) {
	return (
		<LicenciaDesignacionRow
			checked={checked}
			onToggle={() => onToggle(asignacion.id)}
			cupof={asignacion.cupof}
			situacion={asignacion.situacionDeRevista}
			periodo={asignacion.periodo}
			mainContent={
				<div className={styles.tipo}>
					<Building2 size={14} />
					<span>Administrativa</span>
				</div>
			}
			rolContent={<BadgeRolEducativo rolEducativo={asignacion.rolEducativo} />}
		/>
	);
}
