import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";

import styles from "./AccionesEmpleado.module.scss";

type Props = {
	empleadoId: number;
};

export default function AccionesEmpleado({ empleadoId }: Props) {
	const _navigate = useNavigate();

	return (
		<footer className={styles.accionesEmpleado}>
			<div className={styles.accionesEmpleado__actions}>
				<Button variant="primary" size="sm">
					Desactivar
				</Button>
			</div>
		</footer>
	);
}
