import { CalendarDays } from "lucide-react";
import { formatearFecha } from "@/shared/utils";
import type { PeriodoCerradoDTO } from "@/shared/utils/types";
import styles from "./CoberturaCardPeriod.module.scss";

type Props = {
	periodo: PeriodoCerradoDTO;
};

export default function CoberturaCardPeriod({ periodo }: Props) {
	return (
		<div className={styles.meta}>
			<div className={styles.periodo}>
				<CalendarDays size={14} color="#64748b" />

				<div className={styles.content}>
					<span className={styles.label}>Período</span>

					<strong>
						{formatearFecha(periodo.fechaDesde)} ➡️{" "}
						{periodo.fechaHasta
							? formatearFecha(periodo.fechaHasta)
							: "Sin fecha"}
					</strong>
				</div>
			</div>
		</div>
	);
}
