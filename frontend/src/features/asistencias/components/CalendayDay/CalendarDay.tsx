import type { EstadoVisual } from "@/shared/types";
import styles from "./CalendayDay.module.scss";

type Props = {
	date: Date;
	codigo: string | null;
	estadoVisual: EstadoVisual;
	esLaboral: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const estadoClassMap = {
	presente: styles["day--presente"],

	ausente: styles["day--ausente"],
};

export default function CalendarDay({
	date,
	codigo,
	estadoVisual,
	esLaboral,
	className,
	...buttonProps
}: Props) {
	const estadoClass = estadoVisual ? estadoClassMap[estadoVisual] : "";

	return (
		<button
			{...buttonProps}
			type="button"
			className={`
				${className ?? ""}
				${styles.dayContent}
				${estadoClass}
			`}
		>
			<div
				className={`
					${styles.dayInner}
					${esLaboral ? styles["dayInner--laboral"] : ""}
				`}
			>
				<span className={styles.dayNumber}>{date.getDate()}</span>

				{codigo && <span className={styles.dayCode}>{codigo}</span>}
			</div>
		</button>
	);
}
