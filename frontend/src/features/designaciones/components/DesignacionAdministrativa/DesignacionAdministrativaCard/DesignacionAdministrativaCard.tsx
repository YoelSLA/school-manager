import BadgeRolEducativo from "@/shared/components/BadgeRolEducativo";
import type { DesignacionAdministrativaCardDTO } from "@/shared/types";
import DesignacionCard from "../../DesignacionCard";

type Props = {
	designacion: DesignacionAdministrativaCardDTO;
	onVerDetalle: (designacion: DesignacionAdministrativaCardDTO) => void;
};

export default function DesignacionAdministrativaCard({
	designacion,
	onVerDetalle,
}: Props) {
	return (
		<DesignacionCard
			designacionId={designacion.id}
			franjasCount={designacion.cantidadFranjasHorarias}
			cupof={designacion.cupof}
			estadoDesignacion={designacion.estadoDesignacion}
			onVerDetalle={() => onVerDetalle(designacion)}
		>
			<BadgeRolEducativo rolEducativo={designacion.rolEducativo} />
		</DesignacionCard>
	);
}
