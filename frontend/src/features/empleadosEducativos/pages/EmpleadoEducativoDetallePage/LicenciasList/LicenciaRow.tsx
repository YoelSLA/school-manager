
import BadgeEstadoLicencia from "@/components/BagdeEstadoLicencia";
import styles from "./LicenciaRow.module.scss";
import type { EmpleadoEducativoLicenciaItemDTO } from "@/utils/types";

type Props = {
	licencia: EmpleadoEducativoLicenciaItemDTO;
};

export default function LicenciaRow({ licencia }: Props) {
	const { normativa, periodo, estadoLicencia } = licencia;

	return (
		<article className={styles["licencia-row"]}>
			<header className={styles["licencia-row__header"]}>
				<span className={styles["licencia-row__tipo"]}>
					{normativa.codigo} · {normativa.articulo}
				</span>

				<BadgeEstadoLicencia value={estadoLicencia} />

			</header>

			<footer className={styles["licencia-row__footer"]}>
				<span>
					{periodo.fechaDesde} → {periodo.fechaHasta}
				</span>
				<span>· {periodo.dias} días</span>
			</footer>
		</article>
	);
}
