import Button from "@/components/Button";
import { formatearFecha } from "@/utils";
import styles from "./LicenciaTimelineItem.module.scss";
import { LicenciaTimelineItemDTO } from "@/utils/types";

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
							<span className={styles["timeline-item__badge"]}>ACTUAL</span>
						)}
					</div>

					<div className={styles["timeline-item__dates"]}>
						{formatearFecha(item.periodo.fechaDesde)} ➡️{" "}
						{item.periodo.fechaHasta
							? formatearFecha(item.periodo.fechaHasta)
							: "Vigente"}
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
