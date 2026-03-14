import { formatearFecha } from "@/utils";
import type { PeriodoAbiertoDTO } from "@/utils/types";
import styles from "./PeriodoCargo.module.scss";

type Props = {
	periodo: PeriodoAbiertoDTO;
};

export default function PeriodoCargo({ periodo }: Props) {
	const { fechaDesde, fechaHasta } = periodo;

	return (
		<div className={styles.period}>
			<div className={styles.periodItem}>
				<span className={styles.periodLabel}>Toma de posesión</span>
				<span className={styles.periodValue}>{formatearFecha(fechaDesde)}</span>
			</div>

			{fechaHasta && (
				<div className={styles.periodItem}>
					<span className={styles.periodLabel}>Cese</span>
					<span className={styles.periodValue}>
						{formatearFecha(fechaHasta)}
					</span>
				</div>
			)}
		</div>
	);
}
