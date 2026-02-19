import type { DesignacionCursoResumenDTO } from "../../types/designacion.types";
import DesignacionCard from "../DesignacionCard";
import DesignacionCursoInfo from "./DesignacionCursoInfo";

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
			designacionId={designacion.id}
			franjasCount={designacion.franjasHorarias.length}
			cupof={designacion.cupof}
			estadoDesignacion={designacion.estadoDesignacion}
			rolEducativo={designacion.rolEducativo}
			onVerDetalle={() => onVerDetalle(designacion.id)}
		>
			<DesignacionCursoInfo
				designacion={designacion}
			/>
		</DesignacionCard>
	);
}
