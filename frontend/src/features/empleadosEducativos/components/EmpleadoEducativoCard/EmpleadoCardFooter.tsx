import { ArrowRight } from "lucide-react";
import type { EmpleadoEducativoDetalleDTO } from "@/empleadosEducativos/types/empleadosEducativos.types";

import styles from "./EmpleadoCardFooter.module.scss";

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
