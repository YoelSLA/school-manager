import { Card, CardDivider } from "@/components/Card";
import type {
	EstadoDesignacion,
	RolEducativo,
} from "../../types/designacion.types";
import styles from "./DesignacionCard.module.scss";
import DesignacionCardActions from "./DesignacionCardActions/DesignacionCardActions";
import DesignacionCardHeader from "./DesignacionCardHeader/DesignacionCardHeader";
import RolEducativoPill from "./RolEducativoPill/RolEducativoPill";

type Props = {
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	rolEducativo: RolEducativo;
	onVerDetalle: () => void;
	children: React.ReactNode;
	viewTransitionName?: string;
};

export default function DesignacionCard({
	cupof,
	estadoDesignacion,
	rolEducativo,
	children,
	onVerDetalle,
	viewTransitionName,
}: Props) {
	const status = estadoDesignacion === "CUBIERTA" ? "success" : "danger";

	return (
		<Card
			padded
			clickable
			status={status}
			className={styles.card}
			viewTransitionName={viewTransitionName}
			onClick={onVerDetalle}
		>
			<DesignacionCardHeader
				cupof={cupof}
				estadoDesignacion={estadoDesignacion}
			/>

			<CardDivider />

			<div className={styles.centerRow}>
				<RolEducativoPill rolEducativo={rolEducativo} />
			</div>

			<CardDivider />

			{/* CONTENIDO VARIABLE */}
			{children}

			<CardDivider />

			{/* SOLO AFFORDANCE VISUAL */}
			<DesignacionCardActions />
		</Card>
	);
}
