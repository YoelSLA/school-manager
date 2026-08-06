import type {
	DesignacionAdministrativaAsignacionDTO,
	DesignacionCursoAsignacionDTO,
} from "@/features/designacion/types";
import type { BajaAsignacionDTO } from "@/shared/types";
import type { AsignacionEmpleadoEducativoRowDTO } from "../types";

export function esAsignacionCurso(
	asignacion: AsignacionEmpleadoEducativoRowDTO,
): asignacion is Omit<AsignacionEmpleadoEducativoRowDTO, "designacion"> & {
	designacion: DesignacionCursoAsignacionDTO;
} {
	return asignacion.designacion.tipo === "CURSO";
}

export function esAsignacionAdministrativa(
	asignacion: AsignacionEmpleadoEducativoRowDTO,
): asignacion is Omit<AsignacionEmpleadoEducativoRowDTO, "designacion"> & {
	designacion: DesignacionAdministrativaAsignacionDTO;
} {
	return asignacion.designacion.tipo === "ADMINISTRATIVA";
}

export function tieneBaja(
	asignacion: AsignacionEmpleadoEducativoRowDTO,
): asignacion is AsignacionEmpleadoEducativoRowDTO & {
	baja: BajaAsignacionDTO;
} {
	return asignacion.bajaAsigacion !== null;
}

export function esAsignacionActiva(
	asignacion: AsignacionEmpleadoEducativoRowDTO,
): boolean {
	return asignacion.bajaAsigacion === null;
}
