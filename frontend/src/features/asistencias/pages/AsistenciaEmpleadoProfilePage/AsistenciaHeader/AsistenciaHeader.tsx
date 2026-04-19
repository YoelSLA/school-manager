import { useNavigate } from "react-router-dom";
import RolPill from "@/components/RolPill";
import { asistenciasPaths } from "@/router/paths";
import { rolLabels } from "@/features/designaciones/utils/designacion.badges";

import styles from "./AsistenciaHeader.module.scss";

type Props = {
	empleadoId: string;
	empleado: {
		nombre: string;
		apellido: string;
		cuil: string;
		roles: string[];
	};
};

export default function AsistenciaHeader({
	empleadoId,
	empleado,
}: Props) {
	const navigate = useNavigate();

	const now = new Date();
	const anio = now.getFullYear();
	const mes = now.getMonth() + 1;

	function handleVerMesActual() {
		navigate(asistenciasPaths.month(empleadoId, anio, mes), {
			state: {
				empleado,
			},
		});
	}

	return (
		<header className={styles.header}>
			<div className={styles.header__info}>
				<div className={styles.header__main}>
					<h2 className={styles.header__title}>
						{empleado.apellido}, {empleado.nombre}
					</h2>

					<span className={styles.header__cuil}>
						CUIL: {empleado.cuil}
					</span>
				</div>

				<div className={styles.header__roles}>
					{empleado.roles.map((rol) => (
						<RolPill key={rol}>{rolLabels[rol] ?? rol}</RolPill>
					))}
				</div>
			</div>

			<button
				type="button"
				className={styles.button}
				onClick={handleVerMesActual}
			>
				Ver mes actual
			</button>
		</header>
	);
}