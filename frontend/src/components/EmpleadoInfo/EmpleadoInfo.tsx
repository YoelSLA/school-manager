import { IdCard, User } from "lucide-react";
import type { EmpleadoEducativoMinimoDTO } from "@/features/empleadosEducativos/types/empleadosEducativos.types";
import styles from "./EmpleadoInfo.module.scss";

type Props = {
	empleado?: EmpleadoEducativoMinimoDTO | null;
};

export default function EmpleadoInfo({ empleado }: Props) {
	return (
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
	);
}
