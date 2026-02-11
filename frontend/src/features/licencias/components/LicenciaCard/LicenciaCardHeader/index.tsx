import type { LicenciaResumenDTO } from "@/features/licencias/types/licencia.types";
import "./LicenciaCardHeader.css";
import Badge from "@/components/Badge";
import { ESTADO_LICENCIA_BADGE } from "@/features/licencias/utils/licencia.bagdes";

type Props = {
	licencia: LicenciaResumenDTO;
};

export function LicenciaCardHeader({ licencia }: Props) {
	return (
		<div className="licencia-card-header">
			{/* IZQUIERDA */}
			<div className="licencia-tipo-pill">
				<span className="codigo">{licencia.normativa.codigo}</span>
			</div>

			{/* DERECHA */}
			<Badge variant={ESTADO_LICENCIA_BADGE[licencia.estadoLicencia]}>
				{licencia.estadoLicencia}
			</Badge>
		</div>
	);
}
