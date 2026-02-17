import { ArrowRight } from "lucide-react";


import styles from "./EmpleadoCardFooter.module.scss";
import type { EmpleadoEducativoDetalleDTO } from "../../types/empleadosEducativos.types";

type Props = {
	empleado: EmpleadoEducativoDetalleDTO;
	onVerDetalle?: (empleado: EmpleadoEducativoDetalleDTO) => void;
};

export default function EmpleadoCardFooter({ empleado, onVerDetalle }: Props) {
	return (
		<footer className={styles.footer}>
			<button
				type="button"
				className={styles.link}
				onClick={() => onVerDetalle?.(empleado)}
			>
				Ver detalle
				<ArrowRight size={14} className={styles.icon} />
			</button>
		</footer>
	);
}
