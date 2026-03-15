import { LicenciaTimelineItemDTO } from "@/utils/types";
import LicenciaTimelineItem from "./LicenciaTimelineItem";
import styles from "./LicenciaTimelineList.module.scss";

type Props = {
	timeline: LicenciaTimelineItemDTO[];
	licenciaActualId: number;
	onNavigate: (licenciaId: number) => void;
};

export default function LicenciaTimelineList({
	timeline,
	licenciaActualId,
	onNavigate,
}: Props) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.list}>
				{timeline.map((item) => {
					const esActual = item.id === licenciaActualId;

					return (
						<LicenciaTimelineItem
							key={item.id}
							item={item}
							esActual={esActual}
							onNavigate={onNavigate}
						/>
					);
				})}
			</div>
		</div>
	);
}
