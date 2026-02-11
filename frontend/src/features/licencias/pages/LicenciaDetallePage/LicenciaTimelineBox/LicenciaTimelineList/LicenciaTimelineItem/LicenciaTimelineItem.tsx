import type { LicenciaTimelineItemDTO } from "@/features/licencias/types/licencia.types";
import { formatearFecha } from "@/utils";
import Button from "@/components/Button";
import styles from "./LicenciaTimelineItem.module.scss";

type Props = {
	item: LicenciaTimelineItemDTO;
	esActual: boolean;
	onNavigate: (id: number) => void;
};

export default function LicenciaTimelineItem({
	item,
	esActual,
	onNavigate,
}: Props) {
	return (
		<div
			className={`${styles["timeline-item"]} ${esActual ? styles["timeline-item--active"] : ""
				}`}
		>
			<div className={styles["timeline-item__marker"]} />

			<div className={styles["timeline-item__content"]}>
				<div className={styles["timeline-item__main"]}>
					<div className={styles["timeline-item__label-row"]}>
						<span className={styles["timeline-item__label"]}>
							{item.tipo === "ORIGINAL" ? "Original" : "Renovación"}
						</span>

						{esActual && (
							<span className={styles["timeline-item__badge"]}>
								ACTUAL
							</span>
						)}
					</div>

					<div className={styles["timeline-item__dates"]}>
						{formatearFecha(item.periodo.fechaDesde)} ➡️{" "}
						{formatearFecha(item.periodo.fechaHasta)}
					</div>
				</div>

				<div className={styles["timeline-item__side"]}>
					<Button
						variant="primary"
						size="sm"
						disabled={esActual}
						onClick={() => onNavigate(item.id)}
					>
						{esActual ? "Actual" : "Ver detalle"}
					</Button>
				</div>
			</div>
		</div>
	);
}
