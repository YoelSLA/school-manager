import type { DesignacionCursoResumenDTO } from "../../types/designacion.types";
import DesignacionCard from "../DesignacionCard";
import DesignacionCursoInfoSection from "./DesignacionCursoInfoSection/DesignacionCursoInfoSection";

type Props = {
	designacion: DesignacionCursoResumenDTO;
	onVerDetalle: (designacionId: number) => void;
};

export default function DesignacionCursoCard({
	designacion,
	onVerDetalle,
}: Props) {
	return (
		<DesignacionCard
			cupof={designacion.cupof}
			estadoDesignacion={designacion.estadoDesignacion}
			rolEducativo={designacion.rolEducativo}
			viewTransitionName={`designacion-${designacion.cupof}`}
			onVerDetalle={() => onVerDetalle(designacion.id)}
		>
			<DesignacionCursoInfoSection
				materia={designacion.materia}
				curso={designacion.curso}
				orientacion={designacion.orientacion}
				franjasCount={designacion.franjasHorarias.length}
			/>
		</DesignacionCard>
	);
}
