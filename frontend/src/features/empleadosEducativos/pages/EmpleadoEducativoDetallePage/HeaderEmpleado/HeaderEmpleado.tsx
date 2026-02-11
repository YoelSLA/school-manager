import Badge from "@/components/Badge";
import Button from "@/components/Button";
import RolPill from "@/components/RolPill";
import type { EmpleadoEducativoDetalleDTO } from "@/features/empleadosEducativos/types/empleadosEducativos.types";
import {
	ESTADO_EMPLEADO_BADGE,
	getEstadoEmpleadoKey,
} from "@/features/empleadosEducativos/utils/empleadosEducativos.bagdes";
import styles from "./HeaderEmpleado.module.scss";

type Props = {
	empleado: EmpleadoEducativoDetalleDTO;
	onEditar?: () => void;
};

export default function HeaderEmpleado({ empleado, onEditar }: Props) {
	const nombreOrdenado = `${empleado.apellido}, ${empleado.nombre}`;

	const estadoKey = getEstadoEmpleadoKey(empleado.activo);

	return (
		<header className={styles["header-empleado"]}>
			<div className={styles["header-empleado__info"]}>
				<div className={styles["header-empleado__nombre-row"]}>
					<h1 className={styles["header-empleado__nombre"]}>
						{nombreOrdenado}
					</h1>

					<Badge variant={ESTADO_EMPLEADO_BADGE[estadoKey]}>{estadoKey}</Badge>
				</div>

				<div className={styles["header-empleado__badges"]}>
					{empleado.rolesVigentes.map((rol) => (
						<RolPill key={rol}>{rol}</RolPill>
					))}
				</div>
			</div>

			<Button
				onClick={onEditar}
				variant="primary"
				size="sm"
				className={styles["header-empleado__editar"]}
			>
				Editar
			</Button>
		</header>
	);
}
