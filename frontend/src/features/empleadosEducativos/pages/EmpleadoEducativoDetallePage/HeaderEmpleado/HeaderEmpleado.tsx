
import Button from "@/components/Button";
import RolPill from "@/components/RolPill";
import styles from "./HeaderEmpleado.module.scss";
import type { EmpleadoEducativoDetalleDTO } from "@/utils/types";
import BadgeEstadoEmpleado from "@/components/BagdeEstadoEmpleado";

type Props = {
	empleado: EmpleadoEducativoDetalleDTO;
	onEditar?: () => void;
	onToggleActivo?: () => void;
};

export default function HeaderEmpleado({
	empleado,
	onEditar,
	onToggleActivo,
}: Props) {
	const nombreOrdenado = `${empleado.apellido}, ${empleado.nombre}`;

	const esActivo = empleado.activo;

	return (
		<header className={styles["header-empleado"]}>
			<div className={styles["header-empleado__info"]}>
				<div className={styles["header-empleado__nombre-row"]}>
					<h1 className={styles["header-empleado__nombre"]}>
						{nombreOrdenado}
					</h1>

					<BadgeEstadoEmpleado activo={empleado.activo} />
				</div>

				<div className={styles["header-empleado__badges"]}>
					{empleado.rolesVigentes.map((rol) => (
						<RolPill key={rol}>{rol}</RolPill>
					))}
				</div>
			</div>

			<div className={styles["header-empleado__actions"]}>
				{onToggleActivo && (
					<Button
						onClick={onToggleActivo}
						variant={esActivo ? "danger" : "success"}
						size="sm"
					>
						{esActivo ? "Desactivar" : "Reactivar"}
					</Button>
				)}

				<Button
					onClick={onEditar}
					variant="primary"
					size="sm"
					className={styles["header-empleado__editar"]}
				>
					Editar
				</Button>
			</div>
		</header>
	);
}
