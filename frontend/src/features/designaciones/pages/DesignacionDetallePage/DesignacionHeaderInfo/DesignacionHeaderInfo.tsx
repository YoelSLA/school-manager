import RolEducativoBadge from "@/features/empleadosEducativos/components/RolEducativoBadge";
import BadgeEstadoDesignacion from "@/shared/components/BagdeEstadoDesignacion";
import type { DesignacionDetalleDTO } from "@/shared/types";
import styles from "./DesignacionHeaderInfo.module.scss";

type Props = {
	designacion: DesignacionDetalleDTO;
};

export default function DesignacionHeaderInfo({ designacion }: Props) {
	const { rolEducativo, cupof, estadoDesignacion } = designacion;

	return (
		<section className={styles.designacionHeaderInfo}>
			<div className={styles.designacionHeaderInfoTop}>
				<span className={styles.designacionHeaderInfoCupof}>#{cupof}</span>

				<div className={styles.designacionHeaderInfoCenter}>
					<RolEducativoBadge value={rolEducativo} />
				</div>

				<div className={styles.designacionHeaderInfoActions}>
					<BadgeEstadoDesignacion value={estadoDesignacion} />
				</div>
			</div>
		</section>
	);
}
