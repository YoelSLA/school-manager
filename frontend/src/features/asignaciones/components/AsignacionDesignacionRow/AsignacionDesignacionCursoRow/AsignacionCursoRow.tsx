import BadgeEstadoAsignacion from "@/shared/components/BagdeEstadoAsignacion";
import type {
	CargoDesignacionCursoDTO,
	EmpleadoEducativoAsignacionItemDTO,
} from "@/shared/utils/types";
import AsignacionRowFooter from "../../AsignacionRowFooter/AsignacionRowFooter";
import AsignacionRowLayout from "../../AsignacionRowLayout";

type Props = {
	asignacion: EmpleadoEducativoAsignacionItemDTO & {
		designacion: CargoDesignacionCursoDTO;
	};
};

export default function AsignacionDesignacionCursoRow({ asignacion }: Props) {
	const { periodo, situacionDeRevista, estadoAsignacion, designacion } =
		asignacion;

	return (
		<AsignacionRowLayout
			variant="curso"
			title={designacion.materia}
			status={<BadgeEstadoAsignacion value={estadoAsignacion} />}
			subtitle={
				<>
					<span>#{designacion.cupof}</span>

					<span>·</span>

					<span>{designacion.curso}</span>

					{designacion.orientacion && (
						<>
							<span>·</span>

							<span>{designacion.orientacion}</span>
						</>
					)}
				</>
			}
			footer={
				<AsignacionRowFooter
					periodo={periodo}
					situacionDeRevista={situacionDeRevista}
				/>
			}
		/>
	);
}
