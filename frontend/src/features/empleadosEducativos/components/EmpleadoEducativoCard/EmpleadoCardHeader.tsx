import { IdCard, User } from "lucide-react";
import Badge from "@/components/Badge";
import {
	ESTADO_EMPLEADO_BADGE,
	getEstadoEmpleadoKey,
} from "../../utils/empleadosEducativos.bagdes";
import styles from "./EmpleadoCardHeader.module.scss";

type Props = {
	apellido: string;
	nombre: string;
	cuil: string;
	activo: boolean;
};

export default function EmpleadoCardHeader({
	apellido,
	nombre,
	cuil,
	activo,
}: Props) {
	const estadoKey = getEstadoEmpleadoKey(activo);

	return (
		<div className={styles["card-header"]}>
			<div className={styles["card-header__top"]}>
				<div className={styles["card-header__nombre"]}>
					<div className={styles["card-header__nombre-row"]}>
						<User size={18} />

						<div className={styles["card-header__nombre-col"]}>
							<div className={styles["card-header__nombre-linea"]}>
								<span className={styles["card-header__apellido"]}>
									{apellido}
								</span>
							</div>
							<span className={styles["card-header__nombre-text"]}>
								{nombre}
							</span>
						</div>
					</div>
				</div>
				<div className={styles["card-header__cuil"]}>
					<IdCard size={14} />
					{cuil}
				</div>
				<div className={styles["card-header__estado"]}>
					<Badge variant={ESTADO_EMPLEADO_BADGE[estadoKey]}>
						{activo ? "Activo" : "Inactivo"}
					</Badge>
				</div>
			</div>
		</div>
	);
}
