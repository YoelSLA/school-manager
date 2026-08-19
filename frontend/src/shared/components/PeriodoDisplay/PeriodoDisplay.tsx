import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import type { PeriodoDTO } from "../../types";
import { formatDate } from "../../utils/date";
import styles from "./PeriodoDisplay.module.scss";

type Props = {
	periodo: PeriodoDTO;
	showDuration?: boolean;
	showCurrent?: boolean;
};

export default function PeriodoDisplay({
	periodo,
	showDuration = true,
	showCurrent = true,
}: Props) {
	const isClosed = "fechaHasta" in periodo;

	return (
		<div className={styles.periodo}>
			<div className={styles.group}>
				<div className={`${styles.date} ${styles.start}`}>
					<CalendarDays size={14} strokeWidth={2.2} />
					<span>{formatDate(periodo.fechaDesde)}</span>
				</div>

				<ArrowRight className={styles.separator} size={16} strokeWidth={2.2} />

				{isClosed ? (
					<div className={`${styles.date} ${styles.end}`}>
						<CalendarDays size={14} strokeWidth={2.2} />
						<span>{formatDate(periodo.fechaHasta)}</span>
					</div>
				) : (
					showCurrent && (
						<span className={styles.actual}>
							<span className={styles.currentDot} />
							Actual
						</span>
					)
				)}
			</div>

			{showDuration && isClosed && periodo.dias > 0 && (
				<div className={styles.duration}>
					<Clock3 size={13} strokeWidth={2.2} />
					<span>{periodo.dias} días</span>
				</div>
			)}
		</div>
	);
}
