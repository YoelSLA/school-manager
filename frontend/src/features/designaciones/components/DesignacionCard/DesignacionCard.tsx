import { Card, CardDivider } from "@/components/Card";
import type {
	EstadoDesignacion,
	RolEducativo,
} from "../../types/designacion.types";
import styles from "./DesignacionCard.module.scss";
import DesignacionCardHeader from "./DesignacionCardHeader/DesignacionCardHeader";
import DesignacionEmpleado from "./DesignacionEmpleado";
import { useCargoActivo } from "@/features/asignaciones/hooks/useCargoActivo";
import DesignacionCardHorarios from "./DesignacionCardHorarios";

type Props = {
	designacionId: number; // 👈 ahora obligatorio
	franjasCount: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	rolEducativo: RolEducativo;
	onVerDetalle: () => void;
	children: React.ReactNode;
};

export default function DesignacionCard({
	designacionId,
	franjasCount,
	cupof,
	estadoDesignacion,
	children,
	onVerDetalle,
}: Props) {

	const { cargoActivo } = useCargoActivo(designacionId);

	console.log(cargoActivo)

	const empleado = cargoActivo
		? {
			nombre: cargoActivo.empleado.nombre,
			apellido: cargoActivo.empleado.apellido,
			cuil: cargoActivo.empleado.cuil,
			situacionDeRevista: cargoActivo.situacionDeRevista

		}
		: undefined;

	const status =
		estadoDesignacion === "CUBIERTA" ? "success" : "danger";

	return (
		<Card
			clickable
			status={status}
			className={styles.card}
			onClick={onVerDetalle}
		>
			{/* HEADER */}
			<div className={styles.sectionHeader}>
				<DesignacionCardHeader
					cupof={cupof}
					estadoDesignacion={estadoDesignacion}
				/>
			</div>

			<CardDivider />

			{/* PERSONA */}
			<div className={styles.sectionEmpleado}>
				<DesignacionEmpleado
					empleado={empleado}
				/>
			</div>

			<CardDivider />

			<div className={styles.sectionContent}>
				{children}
			</div>

			<CardDivider />


			<div className={styles.sectionHorarios}>
				<DesignacionCardHorarios franjasCount={franjasCount} />
			</div>
		</Card>
	);
}
