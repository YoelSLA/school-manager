import { ShieldCheck, X } from "lucide-react";

import type { LicenciaDetalleDTO } from "@/shared/utils/types";

import EmpleadoLicenciaCard from "./EmpleadoLicenciaCard";

import styles from "./LicenciaVigente.module.scss";

type Props = {
	licencia: LicenciaDetalleDTO | null;
};

export default function LicenciaVigente({ licencia }: Props) {
	return (
		<section className={styles.section}>
			<div className={styles.header}>
				<div className={licencia ? styles.badgeSuccess : styles.badgeDanger}>
					{licencia ? <ShieldCheck size={15} /> : <X size={15} />}

					<span>{licencia ? "Licencia vigente" : "Sin licencia vigente"}</span>
				</div>
			</div>

			{licencia ? (
				<EmpleadoLicenciaCard licencia={licencia} />
			) : (
				<div className={styles.empty}>No posee una licencia vigente</div>
			)}
		</section>
	);
}
