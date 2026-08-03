
import type { AsignacionEmpleadoEducativoRowDTO } from "@/features/asignacion/types";
import { esAsignacionAdministrativa, esAsignacionCurso } from "@/shared/utils";
import EmpleadoEducativoAsignacionAdministrativaRow from "./EmpleadoEducativoAsignacionAdministrativaRow/AsignacionAdministrativaEmpleadoRow";
import EmpleadoEducativoAsignacionCursoRow from "./EmpleadoEducativoAsignacionCursoRow/EmpleadoEducativoAsignacionCursoRow";

type Props = {
  asignacion: AsignacionEmpleadoEducativoRowDTO;
};

export default function EmpleadoEducativoAsignacionRow({ asignacion }: Props) {
  if (esAsignacionCurso(asignacion)) {
    return <EmpleadoEducativoAsignacionCursoRow asignacion={asignacion} />;
  }

  if (esAsignacionAdministrativa(asignacion)) {
    return <EmpleadoEducativoAsignacionAdministrativaRow asignacion={asignacion} />;
  }

  return null;
}