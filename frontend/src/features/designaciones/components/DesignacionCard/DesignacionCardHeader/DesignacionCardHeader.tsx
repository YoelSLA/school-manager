import { Tag } from "lucide-react";
import Badge from "@/components/Badge/Badge";
import type { EstadoDesignacion } from "../../../types/designacion.types";
import { ESTADO_DESIGNACION_BADGE } from "../../../utils/designacion.badges";
import styles from "./DesignacionCardHeader.module.scss";

type Props = {
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
};

export default function DesignacionCardHeader({
	cupof,
	estadoDesignacion,
}: Props) {
	return (
		<header className={styles.header}>
			{/* CUPOF */}
			<div className={styles.cupof}>
				<Tag size={18} />
				<span>#{cupof}</span>
			</div>

			<Badge variant={ESTADO_DESIGNACION_BADGE[estadoDesignacion]}>
				{estadoDesignacion}
			</Badge>
		</header>
	);
}
