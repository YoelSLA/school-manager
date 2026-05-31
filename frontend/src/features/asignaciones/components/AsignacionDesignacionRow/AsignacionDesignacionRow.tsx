import type {
	CargoDesignacionAdministrativaDTO,
	CargoDesignacionCursoDTO,
	EmpleadoEducativoAsignacionItemDTO,
} from "@/shared/utils/types";
import AsignacionDesignacionAdministrativaRow from "./AsignacionDesignacionAdministrativaRow";
import AsignacionDesignacionCursoRow from "./AsignacionDesignacionCursoRow";

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

export default function AsignacionDesignacionRow({ asignacion }: Props) {
	if (isCurso(asignacion)) {
		return <AsignacionDesignacionCursoRow asignacion={asignacion} />;
	}

	if (isAdministrativa(asignacion)) {
		return <AsignacionDesignacionAdministrativaRow asignacion={asignacion} />;
	}

	return null;
}
