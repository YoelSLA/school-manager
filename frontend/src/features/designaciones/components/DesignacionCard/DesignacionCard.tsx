import { Card, CardDivider } from "@/components/Card";
import type {
	EstadoDesignacion,
} from "../../types/designacion.types";

import styles from "./DesignacionCard.module.scss";

import DesignacionCardHeader from "./DesignacionCardHeader/DesignacionCardHeader";
import DesignacionEmpleado from "./DesignacionEmpleado";
import DesignacionCardHorarios from "./DesignacionCardHorarios";

import { useCargoActivo } from "@/features/asignaciones/hooks/useCargoActivo";

type Props = {
	designacionId: number;
	franjasCount: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	onVerDetalle: () => void;
	children: React.ReactNode;
};

export default function DesignacionCard({
	designacionId,
	franjasCount,
	cupof,
	estadoDesignacion,
	onVerDetalle,
	children,
}: Props) {

	const { cargoActivo } = useCargoActivo(designacionId);

	const empleado = cargoActivo?.empleado
		? {
			...cargoActivo.empleado,
			situacionDeRevista: cargoActivo.situacionDeRevista,
		}
		: undefined;

	const status =
		estadoDesignacion === "CUBIERTA"
			? "success"
			: "danger";

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

			{/* EMPLEADO */}
			<div className={styles.sectionEmpleado}>
				<DesignacionEmpleado
					empleado={empleado}
				/>
			</div>

			<CardDivider />

			{/* CONTENIDO ESPECÍFICO (ADMIN / CURSO) */}
			<div className={styles.sectionContent}>
				{children}
			</div>

			<CardDivider />

			{/* HORARIOS */}
			<div className={styles.sectionHorarios}>
				<DesignacionCardHorarios
					franjasCount={franjasCount}
				/>
			</div>

		</Card>
	);
}