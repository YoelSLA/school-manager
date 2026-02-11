import type { LicenciaDetalleDTO } from "@/features/licencias/types/licencia.types";
import Button from "@/components/Button";
import { useLicenciasNavigation } from "@/features/licencias/hooks/useLicenciasNavigation";

import styles from "./LicenciaHeaderStack.module.scss";
import LicenciaInfoBox from "./LicenciaInfoBox";
import LicenciaPersonaBox from "./LicenciaPersonaBox";

type Props = {
	licencia: LicenciaDetalleDTO;
};

export default function LicenciaHeaderStack({ licencia }: Props) {
	const licenciasNav = useLicenciasNavigation();

	return (
		<div className={styles.stack}>
			{/* CONTENIDO */}
			<div className={styles.content}>
				<LicenciaInfoBox licencia={licencia} />
				<LicenciaPersonaBox licencia={licencia} />
			</div>

			{/* ACCIONES */}
			<div className={styles.actions}>
				<Button
					variant="primary"
					onClick={() =>
						licenciasNav.verDesignaciones(licencia.id)
					}
				>
					Ver designaciones afectadas
				</Button>
			</div>
		</div>
	);
}
