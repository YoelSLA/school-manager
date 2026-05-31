import { esAsignacionAdministrativa, esAsignacionCurso } from "@/shared/utils";
import type { AsignacionEmpleadoEducativoRowDTO } from "@/shared/utils/types";
import AsignacionAdministrativaEmpleadoRow from "./AsignacionAdministrativaEmpleadoRow/AsignacionAdministrativaEmpleadoRow";
import AsignacionCursoEmpleadoEducativoRow from "./AsignacionCursoEmpleadoRow/AsignacionCursoEmpleadoRow";

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
