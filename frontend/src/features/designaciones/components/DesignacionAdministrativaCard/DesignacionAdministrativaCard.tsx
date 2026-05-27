import BadgeRolEducativo from "@/shared/components/BadgeRolEducativo";
import type { DesignacionAdministrativaResumenDTO } from "@/shared/utils/types";
import DesignacionCard from "../DesignacionCard";

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
			<BadgeRolEducativo rolEducativo={designacion.rolEducativo} />
		</DesignacionCard>
	);
}
