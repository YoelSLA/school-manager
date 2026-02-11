import styles from "./DesignacionHeaderInfo.module.scss";
import Badge from "@/components/Badge";
import {
	ESTADO_DESIGNACION_BADGE,
	rolEducativoLabels,
} from "@/features/designaciones/utils/designacion.badges";

import type { DesignacionDetalleDTO } from "../../../types/designacion.types";

import { BookOpen, Compass, GraduationCap } from "lucide-react";

type Props = {
	designacion: DesignacionDetalleDTO;
};

export default function DesignacionHeaderInfo({ designacion }: Props) {
	const {
		rolEducativo,
		cupof,
		estadoDesignacion,
		tipo,
	} = designacion;

	const esCurso = tipo === "CURSO";

	const topClassName = [
		styles["designacion-header-info__top"],
		!esCurso && styles["designacion-header-info__top--simple"],
	]
		.filter(Boolean)
		.join(" ");

	return (
		<section className={styles["designacion-header-info"]}>
			<div className={topClassName}>
				{/* IZQUIERDA */}
				<div className={styles["designacion-header-info__left"]}>
					<span className={styles["designacion-header-info__cupof"]}>
						#{cupof}
					</span>

					<h2 className={styles["designacion-header-info__rol"]}>
						{rolEducativoLabels[rolEducativo]}
					</h2>
				</div>

				{/* CENTRO */}
				{esCurso && (
					<div className={styles["designacion-header-info__center"]}>
						<div className={styles["curso-badge"]}>
							<BookOpen size={16} />
							<span className={styles["curso-badge__value"]}>
								{designacion.materia}
							</span>
						</div>

						<div className={styles["curso-badge"]}>
							<GraduationCap size={16} />
							<span className={styles["curso-badge__value"]}>
								{designacion.curso}
							</span>
						</div>

						<div className={styles["curso-badge"]}>
							<Compass size={16} />
							<span className={styles["curso-badge__value"]}>
								{designacion.orientacion}
							</span>
						</div>
					</div>
				)}

				{/* DERECHA */}
				<Badge
					variant={ESTADO_DESIGNACION_BADGE[estadoDesignacion]}
				>
					{estadoDesignacion}
				</Badge>
			</div>
		</section>
	);
}
