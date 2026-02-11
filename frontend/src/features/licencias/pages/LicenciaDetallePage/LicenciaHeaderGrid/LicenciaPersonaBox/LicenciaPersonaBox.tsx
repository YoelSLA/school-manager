import { User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { LicenciaDetalleDTO } from "@/features/licencias/types/licencia.types";

import styles from "./LicenciaPersonaBox.module.scss";

type Props = {
	licencia: LicenciaDetalleDTO;
};

export default function LicenciaPersonaBox({ licencia }: Props) {
	const { empleado } = licencia;
	const navigate = useNavigate();

	const handleVerEmpleado = () => {
		navigate(`/empleadosEducativos/${empleado.id}`, {
			state: {
				from: `/licencias/${licencia.id}`,
				label: "Licencias",
				skipBase: true,
				currentLabel: `${empleado.apellido}, ${empleado.nombre}`,
			},
		});
	};

	return (
		<section className={styles["licencia-persona"]}>
			<div className={styles["licencia-persona__row"]}>
				{/* Info izquierda */}
				<div className={styles["licencia-persona__info"]}>
					<div className={styles["licencia-persona__name"]}>
						<User size={16} />
						{empleado.apellido}, {empleado.nombre}
					</div>

					<div className={styles["licencia-persona__cuil"]}>
						CUIL {empleado.cuil}
					</div>
				</div>

				{/* Acción derecha */}
				<button
					type="button"
					className={styles["licencia-persona__action"]}
					onClick={handleVerEmpleado}
				>
					Ver ficha
					<ArrowRight size={14} />
				</button>
			</div>
		</section>
	);
}
