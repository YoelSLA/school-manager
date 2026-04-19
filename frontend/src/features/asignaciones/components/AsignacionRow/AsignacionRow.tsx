// AsignacionRow.tsx
import type {
	CargoDesignacionAdministrativaDTO,
	CargoDesignacionCursoDTO,
	EmpleadoEducativoAsignacionItemDTO,
} from "@/utils/types";
import AsignacionAdministrativaRow from "../AsignacionAdministrativaRow";
import AsignacionCursoRow from "../AsignacionCursoRow";

type AsignacionCurso = EmpleadoEducativoAsignacionItemDTO & {
	designacion: CargoDesignacionCursoDTO;
};

type AsignacionAdministrativa = EmpleadoEducativoAsignacionItemDTO & {
	designacion: CargoDesignacionAdministrativaDTO;
};

function isCurso(
	asignacion: EmpleadoEducativoAsignacionItemDTO,
): asignacion is AsignacionCurso {
	return asignacion.designacion.tipo === "CURSO";
}

function isAdministrativa(
	asignacion: EmpleadoEducativoAsignacionItemDTO,
): asignacion is AsignacionAdministrativa {
	return asignacion.designacion.tipo === "ADMINISTRATIVA";
}

type Props = {
	asignacion: EmpleadoEducativoAsignacionItemDTO;
};

export default function AsignacionRow({ asignacion }: Props) {
	if (isCurso(asignacion)) {
		return <AsignacionCursoRow asignacion={asignacion} />;
	}

	if (isAdministrativa(asignacion)) {
		return <AsignacionAdministrativaRow asignacion={asignacion} />;
	}

	return null;
}
