import Badge from "@/components/Badge";
import type { EmpleadoEducativoLicenciaItemDTO } from "@/features/empleadosEducativos/types/empleadosEducativos.types";
import { ESTADO_LICENCIA_BADGE } from "@/features/licencias/utils/licencia.bagdes";
import styles from "./LicenciaRow.module.scss";

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

				<Badge variant={ESTADO_LICENCIA_BADGE[estadoLicencia]}>
					{estadoLicencia}
				</Badge>
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
