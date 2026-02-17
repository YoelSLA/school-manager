import { Card, CardDivider } from "@/components/Card";
import EmpleadoCardHeader from "./EmpleadoCardHeader";
import EmpleadoCardInfo from "./EmpleadoCardInfo";
import EmpleadoCardRoles from "./EmpleadoCardRoles";
import type { EmpleadoEducativoDetalleDTO } from "../../types/empleadosEducativos.types";
import styles from "./EmpleadoEducativoCard.module.scss";

type Props = {
	empleado: EmpleadoEducativoDetalleDTO;
	onVerDetalle?: (empleado: EmpleadoEducativoDetalleDTO) => void;
};

export default function EmpleadoEducativoCard({
	empleado,
	onVerDetalle,
}: Props) {
	const { apellido, nombre, cuil, activo, fechaDeIngreso } = empleado;

	/* =====================
		 STATUS DEL CARD
	===================== */
	const cardStatus = activo ? "success" : "info";

	return (
		<Card
			elevated
			status={cardStatus}
			clickable
			onClick={() => onVerDetalle?.(empleado)}
			className={styles.card}
		>
			<EmpleadoCardHeader
				apellido={apellido}
				nombre={nombre}
				cuil={cuil}
				activo={activo}
			/>

			<CardDivider />

			<EmpleadoCardInfo fechaDeIngreso={fechaDeIngreso} />

			<CardDivider />

			<EmpleadoCardRoles roles={empleado.rolesVigentes} />
		</Card>
	);
}
