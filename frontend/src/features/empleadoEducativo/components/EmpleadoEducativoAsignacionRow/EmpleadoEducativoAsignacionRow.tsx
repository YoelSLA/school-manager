import type { AsignacionEmpleadoEducativoRowDTO } from "@/features/asignacion/types";
import {
	esAsignacionAdministrativa,
	esAsignacionCurso,
} from "@/features/asignacion/utils";
import EmpleadoEducativoAsignacionAdministrativaRow from "./EmpleadoEducativoAsignacionAdministrativaRow";
import EmpleadoEducativoAsignacionCursoRow from "./EmpleadoEducativoAsignacionCursoRow";

type Props = {
	asignacion: AsignacionEmpleadoEducativoRowDTO;
};

export default function EmpleadoEducativoAsignacionRow({ asignacion }: Props) {
	if (esAsignacionCurso(asignacion)) {
		return <EmpleadoEducativoAsignacionCursoRow asignacion={asignacion} />;
	}

	if (esAsignacionAdministrativa(asignacion)) {
		return (
			<EmpleadoEducativoAsignacionAdministrativaRow asignacion={asignacion} />
		);
	}

	return null;
}
