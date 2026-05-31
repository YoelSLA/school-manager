import PeriodoDisplay from "@/shared/components/PeriodoDisplay";
import type { PeriodoDTO } from "@/shared/utils/types";
import styles from "./AsignacionCardDetails.module.scss";

type Props = {
	periodo: PeriodoDTO;
	secuencia?: number | null;
};

export default function AsignacionCardDetails({ periodo, secuencia }: Props) {
	return (
		<div className={styles.details}>
			{secuencia != null && (
				<div className={styles.item}>
					<span className={styles.label}>Número de Secuencia</span>

					<span className={styles.value}>{secuencia}</span>
				</div>
			)}
			<div className={styles.item}>
				<span className={styles.label}>Período</span>

				<div className={styles.periodo}>
					<PeriodoDisplay periodo={periodo} showDuration={false} />
				</div>
			</div>
		</div>
	);
}
