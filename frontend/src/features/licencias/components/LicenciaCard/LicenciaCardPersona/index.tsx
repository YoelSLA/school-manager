import type { LicenciaResumenDTO } from "@/features/licencias/types/licencia.types";
import "./LicenciaCardPersona.css";

type Props = {
	licencia: LicenciaResumenDTO;
};

export function LicenciaCardPersona({ licencia }: Props) {
	return (
		<div className="licencia-persona">
			<span className="persona-pill cuil">{licencia.empleado.cuil}</span>

			<span className="persona-pill nombre">
				{licencia.empleado.apellido}, {licencia.empleado.nombre}
			</span>
		</div>
	);
}
