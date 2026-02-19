import type { DesignacionAdministrativaResumenDTO } from "../../types/designacion.types";
import DesignacionCard from "../DesignacionCard";
import RolEducativoPill from "./RolEducativoPill";

type Props = {
	designacion: DesignacionAdministrativaResumenDTO;
	onVerDetalle: (designacionId: number) => void;
};

export default function DesignacionAdministrativaCard({
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
			<RolEducativoPill rolEducativo={designacion.rolEducativo} />
		</DesignacionCard>
	);
}
