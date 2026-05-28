import { User } from "lucide-react";
import type { EmpleadoEducativoMinimoDTO } from "@/shared/utils/types";
import styles from "./AsignacionCardEmployee.module.scss";

type Props = {
	empleado: EmpleadoEducativoMinimoDTO;
};

export default function AsignacionCardEmployee({ empleado }: Props) {
	return (
		<div className={styles.row}>
			<User size={16} />

			<div>
				<div className={styles.name}>
					{empleado.apellido}, {empleado.nombre}
				</div>

				<div className={styles.subtle}>{empleado.cuil}</div>
			</div>
		</div>
	);
}
