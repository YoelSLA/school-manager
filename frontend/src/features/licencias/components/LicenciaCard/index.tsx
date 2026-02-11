import type { LicenciaResumenDTO } from "../../types/licencia.types";
import "./LicenciaCard.css";

import { LicenciaCardActions } from "./LicenciaCardActions";
import { LicenciaCardFechas } from "./LicenciaCardFechas";
import { LicenciaCardHeader } from "./LicenciaCardHeader";
import { LicenciaCardPersona } from "./LicenciaCardPersona";

type Props = {
	licencia: LicenciaResumenDTO;
	onVerDetalle: (licenciaId: number) => void;
};

export default function LicenciaCard({ licencia, onVerDetalle }: Props) {
	return (
		<article className="licencia-card">
			<LicenciaCardHeader licencia={licencia} />

			<div className="dividerCardLicencia" />

			<LicenciaCardPersona licencia={licencia} />

			<div className="dividerCardLicencia" />

			<LicenciaCardFechas periodo={licencia.periodo} />

			<div className="dividerCardLicencia" />

			<LicenciaCardActions onVerDetalle={() => onVerDetalle(licencia.id)} />
		</article>
	);
}
