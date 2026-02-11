import { Clock, ArrowRight } from "lucide-react";
import styles from "./HorarioDia.module.scss";
import { formatearHora } from "@/utils";
import type { FranjaHorariaMinimoDTO } from "@/utils/types";

type Props = {
  dia: string;
  franjas: FranjaHorariaMinimoDTO[];
};

export default function HorarioDia({ dia, franjas }: Props) {
  return (
    <section className={styles["horario-dia"]}>
      <header className={styles["horario-dia__header"]}>
        <span className={styles["horario-dia__nombre"]}>
          {dia}
        </span>
      </header>

      <div className={styles["horario-dia__rangos"]}>
        {franjas.map((f) => (
          <div
            key={`${dia}-${f.horaDesde}-${f.horaHasta}`}
            className={styles["horario-dia__rango"]}
          >
            <Clock size={14} />

            <span className={styles["horario-dia__hora"]}>
              {formatearHora(f.horaDesde)}
            </span>

            <ArrowRight
              size={14}
              className={styles["horario-dia__arrow"]}
            />

            <span className={styles["horario-dia__hora"]}>
              {formatearHora(f.horaHasta)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
