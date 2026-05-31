import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";

import { format } from "date-fns";
import CalendarDay from "@/features/asistencias/components/CalendayDay";
import {
	getCodigoAsistencia,
	getEstadoVisual,
} from "@/features/asistencias/utils";
import type { AsistenciaDiaDTO } from "@/shared/utils/types";
import styles from "./AsistenciaCalendar.module.scss";

type Props = {
	month: Date;

	selected?: Date;

	onMonthChange: (date: Date) => void;

	onDayClick: (date: Date) => void;

	asistenciasMap: Record<string, AsistenciaDiaDTO>;
};

type DayButtonProps = {
	day: {
		date: Date;
	};
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function AsistenciaCalendar({
	month,
	selected,
	onMonthChange,
	onDayClick,
	asistenciasMap,
}: Props) {
	/* =========================================================
	 * HELPERS
	 * =======================================================*/
	const getAsistencia = (date: Date) => {
		const key = date.toISOString().split("T")[0];

		return asistenciasMap[key];
	};

	/* =========================================================
	 * COMPONENTS
	 * =======================================================*/
	function CustomDayButton({ day, ...buttonProps }: DayButtonProps) {
		const date = day.date;

		const asistencia = getAsistencia(date);

		const codigo = getCodigoAsistencia(asistencia);

		const estadoVisual = getEstadoVisual(asistencia);

		return (
			<CalendarDay
				{...buttonProps}
				date={date}
				codigo={codigo}
				estadoVisual={estadoVisual}
				esLaboral={Boolean(asistencia)}
			/>
		);
	}

	return (
		<section className={styles.calendarContainer}>
			<div className={styles.calendarCenter}>
				<DayPicker
					locale={es}
					formatters={{
						formatCaption: (date) => {
							const text = format(date, "LLLL yyyy", {
								locale: es,
							});

							return text.charAt(0).toUpperCase() + text.slice(1);
						},
					}}
					mode="single"
					selected={selected}
					month={month}
					onMonthChange={onMonthChange}
					showOutsideDays
					onDayClick={onDayClick}
					className={styles.calendar}
					components={{
						DayButton: CustomDayButton,
					}}
				/>
			</div>
		</section>
	);
}
