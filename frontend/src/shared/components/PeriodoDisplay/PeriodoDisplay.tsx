import { CalendarDays, Clock3 } from "lucide-react";
import { formatearFecha } from "@/shared/utils";
import type { PeriodoDTO } from "@/shared/utils/types";
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
				<CalendarDays size={14} />

				<span>{formatearFecha(periodo.fechaDesde)}</span>

				{isClosed ? (
					<>
						<span className={styles.separator}>→</span>

						<span>{formatearFecha(periodo.fechaHasta)}</span>
					</>
				) : (
					showCurrent && (
						<>
							<span className={styles.separator}>→</span>

							<span className={styles.actual}>Actual</span>
						</>
					)
				)}
			</div>

			{showDuration && isClosed && periodo.dias > 0 && (
				<div className={styles.duration}>
					<Clock3 size={14} />

					<span>{periodo.dias} días</span>
				</div>
			)}
		</div>
	);
}
