import type { LicenciaDetalleDTO } from "@/shared/utils/types";
import styles from "./LicenciaHeaderStack.module.scss";
import LicenciaInfoBox from "./LicenciaInfoBox";
import LicenciaPersonaBox from "./LicenciaPersonaBox";

type Props = {
	licencia: LicenciaDetalleDTO;
};

export default function LicenciaHeaderStack({ licencia }: Props) {
	return (
		<div className={styles.stack}>
			<LicenciaInfoBox licencia={licencia} />

			<LicenciaPersonaBox licencia={licencia} />
		</div>
	);
}
