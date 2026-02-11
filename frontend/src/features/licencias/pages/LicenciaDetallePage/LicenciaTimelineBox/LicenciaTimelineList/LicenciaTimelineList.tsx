import type { LicenciaTimelineItemDTO } from "@/features/licencias/types/licencia.types";
import styles from "./LicenciaTimelineList.module.scss";
import LicenciaTimelineItem from "./LicenciaTimelineItem";

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
