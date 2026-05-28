import type {
	AsignacionAdministrativaEmpleadoEducativoRowDTO,
	AsignacionCursoEmpleadoEducativoRowDTO,
	AsignacionEmpleadoEducativoRowDTO,
} from "@/shared/utils/types";
import AsignacionAdministrativaEmpleadoRow from "./AsignacionAdministrativaEmpleadoRow/AsignacionAdministrativaEmpleadoRow";
import AsignacionCursoEmpleadoEducativoRow from "./AsignacionCursoEmpleadoRow/AsignacionCursoEmpleadoRow";

function esAsignacionCurso(
	asignacion: AsignacionEmpleadoEducativoRowDTO,
): asignacion is AsignacionCursoEmpleadoEducativoRowDTO {
	return asignacion.tipo === "CURSO";
}

function esAsignacionAdministrativa(
	asignacion: AsignacionEmpleadoEducativoRowDTO,
): asignacion is AsignacionAdministrativaEmpleadoEducativoRowDTO {
	return asignacion.tipo === "ADMINISTRATIVA";
}

type Props = {
	asignacion: AsignacionEmpleadoEducativoRowDTO;
};

export default function AsignacionEmpleadoRow({ asignacion }: Props) {
	if (esAsignacionCurso(asignacion)) {
		return <AsignacionCursoEmpleadoEducativoRow asignacion={asignacion} />;
	}

	if (esAsignacionAdministrativa(asignacion)) {
		return <AsignacionAdministrativaEmpleadoRow asignacion={asignacion} />;
	}

	return null;
}
