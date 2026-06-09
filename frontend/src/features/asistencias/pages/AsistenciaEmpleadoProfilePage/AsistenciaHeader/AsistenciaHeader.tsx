import { useNavigate } from "react-router-dom";
import { asistenciasPaths } from "@/app/router/paths";

import BadgeRolEducativo from "@/shared/components/BadgeRolEducativo";
import type { RolEducativo } from "@/shared/types/enums";
import styles from "./AsistenciaHeader.module.scss";

type Props = {
	empleadoId: string;
	empleado: {
		nombre: string;
		apellido: string;
		cuil: string;
		roles: RolEducativo[];
	};
};

export default function AsistenciaHeader({ empleadoId, empleado }: Props) {
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

					<span className={styles.header__cuil}>CUIL: {empleado.cuil}</span>
				</div>

				<div className={styles.header__roles}>
					{empleado.roles.map((rol) => (
						<BadgeRolEducativo rolEducativo={rol} key={rol} />
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
