import Button from "@/components/Button";
import { MESES } from "@/features/asistencias/utils/asistencias.utils";
import styles from "./SidebarTiempo.module.scss";

type Props = {
	anio: number;
	mes: number;
	onChangeAnio: (anio: number) => void;
	onChangeMes: (mes: number) => void;
};

export default function SidebarTiempo({
	anio,
	mes,
	onChangeAnio,
	onChangeMes,
}: Props) {
	const today = new Date();
	const currentMonth = today.getMonth() + 1;
	const currentYear = today.getFullYear();

	return (
		<aside className={styles["sidebar-tiempo"]}>
			{/* ===== SELECTOR DE AÑO ===== */}
			<div className={styles["sidebar-tiempo__year"]}>
				<Button
					variant="filter"
					size="sm"
					className={styles["sidebar-tiempo__year-arrow"]}
					onClick={() => onChangeAnio(anio - 1)}
				>
					◀
				</Button>

				<span className={styles["sidebar-tiempo__year-value"]}>{anio}</span>

				<Button
					variant="filter"
					size="sm"
					className={styles["sidebar-tiempo__year-arrow"]}
					onClick={() => onChangeAnio(anio + 1)}
				>
					▶
				</Button>
			</div>

			{/* ===== LISTA DE MESES ===== */}
			<div className={styles["sidebar-tiempo__months"]}>
				{MESES.map((nombreMes, index) => {
					const monthNumber = index + 1;
					const isActive = monthNumber === mes;
					const isCurrent =
						monthNumber === currentMonth && anio === currentYear;

					return (
						<Button
							key={nombreMes}
							variant="filter"
							size="sm"
							active={isActive}
							className={styles["sidebar-tiempo__month"]}
							onClick={() => onChangeMes(monthNumber)}
						>
							<span>{nombreMes}</span>

							{isCurrent && !isActive && (
								<span className={styles["sidebar-tiempo__current-dot"]} />
							)}
						</Button>
					);
				})}
			</div>
		</aside>
	);
}
