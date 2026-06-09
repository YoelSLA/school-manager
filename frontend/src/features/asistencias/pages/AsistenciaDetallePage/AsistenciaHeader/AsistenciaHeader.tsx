import Button from "@/components/Button";
import BadgeRolEducativo from "@/shared/components/BadgeRolEducativo";
import type { RolEducativo } from "@/shared/types/enums";
import styles from "./AsistenciaHeader.module.scss";

type AsistenciaHeaderEmpleado = {
	nombre: string;
	apellido: string;
	cuil: string;
	roles?: RolEducativo[];
};

type Props = {
	empleado: AsistenciaHeaderEmpleado;
	onVerHistorial?: () => void;
};

export default function AsistenciaHeader({ empleado, onVerHistorial }: Props) {
	return (
		<header className={styles.header}>
			{/* =============================================
			 * INFO
			 * ===========================================*/}
			<div className={styles.info}>
				<span className={styles.cuil}>{empleado?.cuil}</span>

				<span className={styles.separator}>•</span>

				<span className={styles.nombre}>
					{empleado?.apellido}, {empleado?.nombre}
				</span>
			</div>

			{/* =============================================
			 * ROLES
			 * ===========================================*/}
			<div className={styles.roles}>
				{empleado?.roles?.map((rol) => (
					<BadgeRolEducativo rolEducativo={rol} key={rol} />
				))}
			</div>

			{/* =============================================
			 * ACTION
			 * ===========================================*/}
			<Button size="sm" onClick={onVerHistorial}>
				Ver historial
			</Button>
		</header>
	);
}
