import { BookOpen, Compass, GraduationCap, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BadgeEstadoDesignacion from "@/components/BagdeEstadoDesignacion";
import Button from "@/components/Button";
import RolEducativoBadge from "@/features/empleadosEducativos/components/RolEducativoBadge";
import { designacionesPaths } from "@/router/paths";
import type { DesignacionDetalleDTO } from "@/utils/types";
import styles from "./DesignacionHeaderInfo.module.scss";

type Props = {
	designacion: DesignacionDetalleDTO;
};

export default function DesignacionHeaderInfo({ designacion }: Props) {
	const navigate = useNavigate();

	const { id, rolEducativo, cupof, estadoDesignacion, tipo } = designacion;

	const esCurso = tipo === "CURSO";

	const topClassName = [
		styles["designacion-header-info__top"],
		!esCurso && styles["designacion-header-info__top--simple"],
	]
		.filter(Boolean)
		.join(" ");

	const handleEditar = () => {
		navigate(designacionesPaths.edit(id));
	};

	return (
		<section className={styles["designacion-header-info"]}>
			<div className={topClassName}>
				<div className={styles["designacion-header-info__left"]}>
					<span className={styles["designacion-header-info__cupof"]}>
						#{cupof}
					</span>
					<RolEducativoBadge value={rolEducativo} />
				</div>

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

				<div className={styles["designacion-header-info__actions"]}>
					<BadgeEstadoDesignacion value={estadoDesignacion} />

					<Button variant="secondary" size="sm" onClick={handleEditar}>
						<Pencil size={16} />
						Editar
					</Button>
				</div>
			</div>
		</section>
	);
}
