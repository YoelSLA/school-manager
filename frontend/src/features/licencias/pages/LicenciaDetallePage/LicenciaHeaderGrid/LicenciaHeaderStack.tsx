import Button from "@/components/Button";
import { useLicenciasNavigation } from "@/features/licencias/hooks/useLicenciasNavigation";
import type { LicenciaDetalleDTO } from "@/utils/types";
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
					onClick={() => {
						licenciasNav.verDesignaciones(
							licencia.id,
							licencia.empleado,
							licencia,
						);
					}}
				>
					Ver designaciones afectadas
				</Button>
			</div>
		</div>
	);
}
