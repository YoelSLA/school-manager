import { IdCard, User } from "lucide-react";
import SituacionRevistaBadge from "@/components/SituacionRevistaBadge/SituacionRevistaBadge";
import type { SituacionDeRevista } from "@/features/asignaciones/types/asignacion.types";
import styles from "./DesignacionEmpleado.module.scss";

type Props = {
	empleado?: {
		nombre: string;
		apellido: string;
		cuil: string;
		situacionDeRevista: SituacionDeRevista;
	};
};

export default function DesignacionEmpleado({ empleado }: Props) {
	return (
		<div className={styles.persona}>
			{empleado && (
				<div className={styles.badgeWrapper}>
					<SituacionRevistaBadge value={empleado.situacionDeRevista} />
				</div>
			)}

			<div className={styles.info}>
				<div className={styles.line}>
					<User size={14} />
					<span className={styles.nombre}>
						{empleado
							? `${empleado.apellido}, ${empleado.nombre}`
							: "Cargo vacante"}
					</span>
				</div>

				<div className={styles.line}>
					<IdCard size={14} />
					<span className={styles.cuil}>{empleado ? empleado.cuil : "—"}</span>
				</div>
			</div>
		</div>
	);
}
