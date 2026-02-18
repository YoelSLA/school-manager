import { Card, CardDivider } from "@/components/Card";
import EmpleadoCardHeader from "./EmpleadoCardHeader/EmpleadoCardHeader";
import EmpleadoCardInfo from "./EmpleadoCardInfo/EmpleadoCardInfo";
import EmpleadoCardRoles from "./EmpleadoCardRoles/EmpleadoCardRoles";
import type { EmpleadoEducativoDetalleDTO } from "../../types/empleadosEducativos.types";
import styles from "./EmpleadoEducativoCard.module.scss";
import { formatFechaIngreso } from "@/utils";


type Props = {
	empleado: EmpleadoEducativoDetalleDTO;
	onVerDetalle?: (empleado: EmpleadoEducativoDetalleDTO) => void;
};

export default function EmpleadoEducativoCard({
	empleado,
	onVerDetalle,
}: Props) {
	const { apellido, nombre, cuil, activo, fechaDeIngreso } = empleado;
	console.log(fechaDeIngreso, "FECHA DE INGRESO")
	const { texto, tieneFecha } = formatFechaIngreso(fechaDeIngreso);

	/* =====================
		 STATUS DEL CARD
	===================== */
	const cardStatus = activo ? "success" : "danger";

	return (
		<Card
			elevated
			status={cardStatus}
			clickable
			onClick={() => onVerDetalle?.(empleado)}
			className={styles.card}
		>
			<div className={styles.sectionHeader}>
				<EmpleadoCardHeader
					apellido={apellido}
					nombre={nombre}
					cuil={cuil}
					activo={activo}
				/>
			</div>

			<CardDivider />

			<div className={styles.sectionInfo}>
				<EmpleadoCardInfo
					fecha={texto}
					tieneFecha={tieneFecha}
				/>
			</div>

			<CardDivider />

			<div className={styles.sectionRoles}>
				<EmpleadoCardRoles roles={empleado.rolesVigentes} />
			</div>
		</Card>
	);
}
