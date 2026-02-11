import { Card, CardDivider } from "@/components/Card";
import type { EmpleadoEducativoDetalleDTO } from "@/empleadosEducativos/types/empleadosEducativos.types";
import EmpleadoCardFooter from "./EmpleadoCardFooter";
import EmpleadoCardHeader from "./EmpleadoCardHeader";
import EmpleadoCardInfo from "./EmpleadoCardInfo";
import EmpleadoCardRoles from "./EmpleadoCardRoles";

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
		<Card elevated status={cardStatus}>
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

			<CardDivider />

			<EmpleadoCardFooter empleado={empleado} onVerDetalle={onVerDetalle} />
		</Card>
	);
}
