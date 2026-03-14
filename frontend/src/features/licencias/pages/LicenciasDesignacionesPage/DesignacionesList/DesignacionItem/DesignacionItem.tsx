import { BookOpen, Briefcase, GraduationCap, Hash } from "lucide-react";
import Badge from "@/components/Badge";
import { ESTADO_DESIGNACION_BADGE } from "@/features/designaciones/utils/designacion.badges";
import type { LicenciaDesignacionDTO } from "@/features/licencias/types/licencia.types";
import styles from "./DesignacionItem.module.scss";

type Props = {
	designacion: LicenciaDesignacionDTO;
	checked: boolean;
	onToggle: (id: number) => void;
};

export default function DesignacionItem({
	designacion,
	checked,
	onToggle,
}: Props) {
	const estaCubierta = designacion.estado === "CUBIERTA";
	const { estado } = designacion;

	return (
		<label
			className={`${styles.designacionItem} ${
				estaCubierta ? styles["designacionItem--disabled"] : ""
			}`}
		>
			<input
				type="checkbox"
				checked={checked}
				disabled={estaCubierta}
				onChange={() => onToggle(designacion.designacionId)}
			/>

			<div className={styles.designacionItem__content}>
				<div className={styles.designacionItem__header}>
					<div className={styles.designacionItem__role}>
						<Briefcase size={16} color="#2563eb" />
						<span>{designacion.rolEducativo}</span>
					</div>

					<Badge variant={ESTADO_DESIGNACION_BADGE[estado]}>{estado}</Badge>
				</div>

				<div className={styles.designacionItem__cupof}>
					<Hash size={14} color="#9ca3af" />
					<span>{designacion.cupof}</span>
				</div>

				{designacion.tipo === "CURSO" && (
					<div className={styles.designacionItem__academico}>
						<div>
							<BookOpen size={14} color="#7c3aed" />
							<span>
								{designacion.curso} · {designacion.materia}
							</span>
						</div>

						<div>
							<GraduationCap size={14} color="#059669" />
							<span>{designacion.orientacion}</span>
						</div>
					</div>
				)}

				{designacion.tipo === "ADMINISTRATIVA" && (
					<div className={styles.designacionItem__academico}>
						<div>
							<Briefcase size={14} />
							<span>Designación administrativa</span>
						</div>
					</div>
				)}
			</div>
		</label>
	);
}
