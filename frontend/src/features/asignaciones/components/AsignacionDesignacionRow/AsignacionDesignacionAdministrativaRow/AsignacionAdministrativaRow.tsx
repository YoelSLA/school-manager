import BadgeEstadoAsignacion from "@/shared/components/BagdeEstadoAsignacion";
import type {
	CargoDesignacionAdministrativaDTO,
	EmpleadoEducativoAsignacionItemDTO,
} from "@/shared/utils/types";
import AsignacionRowFooter from "../../AsignacionRowFooter/AsignacionRowFooter";
import AsignacionRowLayout from "../../AsignacionRowLayout";

type Props = {
	asignacion: EmpleadoEducativoAsignacionItemDTO & {
		designacion: CargoDesignacionAdministrativaDTO;
	};
};

function formatRol(rol: string) {
	return rol
		.toLowerCase()
		.replaceAll("_", " ")
		.replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function AsignacionDesignacionAdministrativaRow({
	asignacion,
}: Props) {
	const { designacion, periodo, situacionDeRevista, estadoAsignacion } =
		asignacion;

	return (
		<AsignacionRowLayout
			variant="administrativa"
			title={formatRol(designacion.rolEducativo)}
			status={<BadgeEstadoAsignacion value={estadoAsignacion} />}
			subtitle={<span>#{designacion.cupof}</span>}
			footer={
				<AsignacionRowFooter
					periodo={periodo}
					situacionDeRevista={situacionDeRevista}
				/>
			}
		/>
	);
}
