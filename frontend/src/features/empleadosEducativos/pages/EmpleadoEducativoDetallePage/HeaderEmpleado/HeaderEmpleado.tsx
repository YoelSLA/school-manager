import BadgeRolEducativo from "@/components/BadgeRolEducativo";
import BadgeEstadoEmpleado from "@/components/BagdeEstadoEmpleado";
import type { EmpleadoEducativoDetalleDTO } from "@/utils/types";
import styles from "./HeaderEmpleado.module.scss";

type Props = {
	empleado: EmpleadoEducativoDetalleDTO;
	onEditar?: () => void;
	onToggleActivo?: () => void;
};

export default function HeaderEmpleado({ empleado }: Props) {
	const nombreOrdenado = `${empleado.apellido}, ${empleado.nombre}`;

	return (
		<header className={styles["header-empleado"]}>
			<div className={styles["header-empleado__info"]}>
				<div className={styles["header-empleado__nombre-row"]}>
					<h1 className={styles["header-empleado__nombre"]}>
						{nombreOrdenado}
					</h1>

					<BadgeEstadoEmpleado activo={empleado.activo} />
				</div>
			</div>
			<div className={styles["header-empleado__badges"]}>
				{empleado.rolesVigentes.map((rol) => (
					<BadgeRolEducativo key={rol} value={rol} />
				))}
			</div>
		</header>
	);
}
