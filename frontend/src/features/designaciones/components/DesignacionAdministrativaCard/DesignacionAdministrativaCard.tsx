import type { DesignacionAdministrativaResumenDTO } from "../../types/designacion.types";
import DesignacionCard from "../DesignacionCard";
import RolEducativoPill from "./RolEducativoPill";

type Props = {
	designacion: DesignacionAdministrativaResumenDTO;
	onVerDetalle: (designacion: DesignacionAdministrativaResumenDTO) => void;
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
			onVerDetalle={() => onVerDetalle(designacion)}
		>
			<RolEducativoPill rolEducativo={designacion.rolEducativo} />
		</DesignacionCard>
	);
}
