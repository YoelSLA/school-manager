import { ArrowRight, Clock } from "lucide-react";
import { formatearHora } from "@/shared/utils";
import type { FranjaHorariaMinimoDTO } from "@/shared/utils/types";
import type { Dia } from "@/shared/utils/types/enums";
import styles from "./HorarioDia.module.scss";

type Props = {
	dia: Dia;
	franjas?: FranjaHorariaMinimoDTO[];
};

export default function HorarioDia({ dia, franjas = [] }: Props) {
	return (
		<div className={styles.col}>
			{/* HEADER */}
			<div className={styles.header}>{dia}</div>

			{/* BODY */}
			<div className={styles.body}>
				{franjas.length > 0 ? (
					franjas.map((f) => (
						<div
							key={`${dia}-${f.horaDesde}-${f.horaHasta}`}
							className={styles.rango}
						>
							<Clock size={14} />

							<span>{formatearHora(f.horaDesde)}</span>

							<ArrowRight size={14} />

							<span>{formatearHora(f.horaHasta)}</span>
						</div>
					))
				) : (
					<span className={styles.empty}>Sin horario</span>
				)}
			</div>
		</div>
	);
}
