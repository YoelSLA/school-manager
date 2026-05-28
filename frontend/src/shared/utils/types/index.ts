import type { LucideIcon } from "lucide-react";
import type z from "zod";
import type { BadgeVariant } from "@/components/Badge/Badge.types";
import type { createProvisionalSchema } from "@/features/asignaciones/form/createProvisional.schema";
import type { createTitularSchema } from "@/features/asignaciones/form/createTitular.schema";
import type { updateProvisionalSchema } from "@/features/asignaciones/form/updateProvisional.schema";
import type { updateTitularSchema } from "@/features/asignaciones/form/updateTitular.schema";
import type { crearCursoSchema } from "@/features/cursos/form/crearCurso.schema";
import type { createDesignacionAdministrativaSchema } from "@/features/designaciones/form/schemas/createDesignacionAdministrativa.schema";
import type { createDesignacionCursoSchema } from "@/features/designaciones/form/schemas/createDesignacionCurso.schema";
import type { updateDesignacionAdministrativaSchema } from "@/features/designaciones/form/schemas/updateDesignacionAdministrativa.schema";
import type { updateDesignacionCursoSchema } from "@/features/designaciones/form/schemas/updateDesignacionCurso.schema";
import type { crearEmpleadoEducativoSchema } from "@/features/empleadosEducativos/form/schemas/crearEmpleadoEducativo.schema";
import type { darBajaEmpleadoEducativo } from "@/features/empleadosEducativos/form/schemas/darBajaEmpleadoEducativo.schema";
import type { editarEmpleadoEducativoSchema } from "@/features/empleadosEducativos/form/schemas/editarEmpleadoEducativo.schema";
import type { crearEscuelaSchema } from "@/features/escuelas/form/crearEscuela.schema";
import type { crearLicenciaSchema } from "@/features/licencias/form/crearLicencia.schema";
import type { cubrirDesignacionesConSuplenteSchema } from "@/features/licencias/form/cubrirDesignacionesConSuplente.schema";
import type { TipoLicencia } from "@/features/licencias/utils/tipoLicencia";
import type { crearMateriaSchema } from "@/features/materias/form/schemas/crearMateria.schema";
import type {
	Dia,
	EstadoAsignacion,
	EstadoDesignacion,
	EstadoLicencia,
	RolEducativo,
	SituacionDeRevista,
} from "./enums";

// -------------------------------------------------------------------
// ASIGNACION
// -------------------------------------------------------------------

export type AsignacionEmpleadoEducativoRowDTO =
	| AsignacionCursoEmpleadoEducativoRowDTO
	| AsignacionAdministrativaEmpleadoEducativoRowDTO;

export interface BaseEmpleadoEducativoAsignacionRowDTO {
	id: number;
	periodo: PeriodoDTO;
	situacionDeRevista: SituacionDeRevista;
	estadoAsignacion: EstadoAsignacion;
	baja: BajaAsignacionDTO | null;
}

export interface AsignacionCursoEmpleadoEducativoRowDTO
	extends BaseEmpleadoEducativoAsignacionRowDTO {
	tipo: "CURSO";
	designacion: DesignacionCursoAsignacionDTO;
}

export interface AsignacionAdministrativaEmpleadoEducativoRowDTO
	extends BaseEmpleadoEducativoAsignacionRowDTO {
	tipo: "ADMINISTRATIVA";
	designacion: DesignacionAdministrativaAsignacionDTO;
}

export interface BajaAsignacionDTO {
	fecha: string;
	causa: CausaBaja;
}

export type CubrirTitularDTO = z.infer<typeof createTitularSchema>;

export type CubrirProvisionalDTO = z.infer<typeof createProvisionalSchema>;

export type EditarTitularDTO = z.infer<typeof updateTitularSchema>;

export type EditarProvisionalDTO = z.infer<typeof updateProvisionalSchema>;

export type AsignacionDetalleDTO = {
	id: number;
	empleado: EmpleadoEducativoMinimoDTO;
	periodo: PeriodoCerradoDTO;
	situacionDeRevista: SituacionDeRevista;
	fechaBaja: string;
	causaBaja: string;
	estadoAsignacion: EstadoAsignacion;
	secuencia: number;
};

export type FiltroCargos = "LICENCIA" | "FINALIZADA" | "BAJA";

export type EditarAsignacionDTO = {
	empleadoId: number;
	fechaTomaPosesion: string;
	fechaCese?: string | null;
};

export type CargoDesignacionDTO =
	| CargoDesignacionCursoDTO
	| CargoDesignacionAdministrativaDTO;

export type CargoDesignacionCursoDTO = {
	tipo: "CURSO";
	id: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	materia: string;
	curso: string;
	orientacion: string;
};

export type CargoDesignacionAdministrativaDTO = {
	tipo: "ADMINISTRATIVA";
	id: number;
	cupof: number;
	rolEducativo: RolEducativo;
	estadoDesignacion: EstadoDesignacion;
};

// -------------------------------------------------------------------
// ASISTENCIA
// -------------------------------------------------------------------
export type EstadoAsistencia = "PRESENTE" | "AUSENTE";

export type OrigenAsistencia = "MANUAL" | "LICENCIA";

export interface AsistenciaDiaDTO {
	id: number | null;
	fecha: string;
	estadoAsistencia: EstadoAsistencia;
	origenAsistencia: OrigenAsistencia | null;
	tipoLicencia: string | null;
	licencia: LicenciaResumenDTO | null;
}

export type EmpleadoAsistenciaItem = {
	id: number;
	cuil: string;
	apellido: string;
	nombre: string;
	roles: RolEducativo[];
};

export type FiltrosAsistencias = {
	rolesSeleccionados: RolEducativo[];
	busqueda: string;
};

export type RolCountDTO = {
	id: RolEducativo;
	label: string;
	count: number;
};

export type EmpleadoAsistenciaDTO = {
	id: number;
	cuil: string;
	nombre: string;
	apellido: string;
	roles: RolEducativo[];
};

export type RegistrarInasistenciasManualDTO = {
	empleadoId: number;
	fechas: string[];
	tipoLicencia: string;
	observacion?: string;
};

export type EliminarInasistenciasManualDTO = {
	empleadoId: number;
	fechas: string[];
};

// -------------------------------------------------------------------
// CURSO
// -------------------------------------------------------------------

export type CursoCreateDTO = z.infer<typeof crearCursoSchema>;

export type CursoFiltro = "TODOS" | "MANIANA" | "TARDE" | "VESPERTINO";

export type Turno = "MANIANA" | "TARDE" | "VESPERTINO";

export type CursoResponseDTO = {
	id: number;
	anio: number;
	grado: number;
	division: string;
	turno: Turno;
};

export type CursoNombreDTO = {
	id: number;
	division: string;
	turno: Turno;
};

// -------------------------------------------------------------------
// DESIGNACION
// -------------------------------------------------------------------
export interface DesignacionAdministrativaAsignacionDTO {
	id: number;
	cupof: number;
	rolEducativo: RolEducativo;
	estadoDesignacion: EstadoDesignacion;
}

export interface DesignacionCursoAsignacionDTO {
	id: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	materia: string;
	curso: string;
	orientacion: string;
}

export type DesignacionAdministrativaFormValues = z.input<
	typeof createDesignacionAdministrativaSchema
>;

export type DesignacionAdministrativaCreateDTO = z.infer<
	typeof createDesignacionAdministrativaSchema
>;

export type DesignacionCursoFormValues = z.input<
	typeof createDesignacionCursoSchema
>;

export type DesignacionCursoCreateDTO = z.infer<
	typeof createDesignacionCursoSchema
>;

export type DesignacionAdministrativaUpdateDTO = z.infer<
	typeof updateDesignacionAdministrativaSchema
>;

export type DesignacionCursoUpdateDTO = z.infer<
	typeof updateDesignacionCursoSchema
>;

export type DesignacionResumenDTO = {
	id: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	rolEducativo: RolEducativo;
	franjasHorarias: FranjaHorariaMinimoDTO[];
};

export type DesignacionAdministrativaResumenDTO = DesignacionResumenDTO;

export type DesignacionCursoResumenDTO = DesignacionResumenDTO & {
	materia: string;
	curso: string;
	orientacion: string;
};

export type DesignacionResumen =
	| (DesignacionAdministrativaResumenDTO & { tipo: "ADMINISTRATIVA" })
	| (DesignacionCursoResumenDTO & { tipo: "CURSO" });

export type DesignacionDetalleBaseDTO = {
	id: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	rolEducativo: RolEducativo;
	tipo: "ADMINISTRATIVA" | "CURSO";
	asignaciones: AsignacionDetalleDTO[];
	franjasHorarias: FranjaHorariaMinimoDTO[];
};

export type DesignacionAdministrativaDetalleDTO = DesignacionDetalleBaseDTO & {
	tipo: "ADMINISTRATIVA";
};

export type DesignacionCursoDetalleDTO = DesignacionDetalleBaseDTO & {
	tipo: "CURSO";
	materia: string;
	curso: string;
	orientacion: string;
};

export type DesignacionDetalleDTO =
	| DesignacionAdministrativaDetalleDTO
	| DesignacionCursoDetalleDTO;

export type DesignacionFiltro = "ADMIN" | "CURSO";

export type EstadoCargo = "LICENCIA" | "BAJA" | "FINALIZADA" | "PENDIENTE";

export type DesignacionCursoFilter = {
	cursoId?: string;
	materiaId?: string;
	orientacion?: string;
	estado?: string;
};

export type CursoFiltersState = {
	cursoId?: string;
	materiaId?: string;
	orientacion?: string;
	estado?: string;
};

// -------------------------------------------------------------------
// EMPLEADO EDUCATIVO
// -------------------------------------------------------------------

export type EmpleadoEducativoCreateDTO = z.infer<
	typeof crearEmpleadoEducativoSchema
>;

export type EmpleadoEducativoUpdateDTO = z.infer<
	typeof editarEmpleadoEducativoSchema
>;

export type BajaDefinitivaDTO = z.infer<typeof darBajaEmpleadoEducativo>;

export interface EmpleadoEducativoDetalleDTO {
	id: number;
	cuil: string;
	nombre: string;
	apellido: string;
	domicilio: string;
	telefono: string;
	email: string;
	fechaDeNacimiento: string;
	fechaDeIngreso: string;
	activo: boolean;
	asignaciones: EmpleadoEducativoAsignacionItemDTO[];
	licencias: EmpleadoEducativoLicenciaItemDTO[];
	rolesVigentes: RolEducativo[];
}

export interface EmpleadoEducativoMinimoDTO {
	id: number;
	cuil: string;
	nombre: string;
	apellido: string;
}

export type EmpleadoEducativoAsignacionItemDTO = {
	id: number;
	periodo: PeriodoAbiertoDTO;
	situacionDeRevista: SituacionDeRevista;
	fechaBaja: string;
	causaBaja: string;
	estadoAsignacion: EstadoAsignacion;
	cupof: number;
	designacion: CargoDesignacionDTO;
};

export type EmpleadoEducativoLicenciaItemDTO = {
	id: number;
	normativa: {
		codigo: string;
		articulo: string;
		descripcion: string;
	};
	periodo: PeriodoCerradoDTO;
	estadoLicencia: EstadoLicencia;
};

export type EmpleadoEducativoFiltro = "TODOS" | "ACTIVOS" | "INACTIVOS";

export type EmpleadoFormValues = {
	cuil: string; // read-only en UI pero viaja en el objeto
	nombre: string;
	apellido: string;
	fechaNacimiento: string; // ISO yyyy-MM-dd
	telefono?: string;
	email: string;
	domicilio?: string;
	fechaIngreso?: string; // ISO yyyy-MM-dd
};

export type CausaBaja =
	| "RENUNCIA_POR_CAUSAS_PARTICULARES"
	| "RENUNCIA_POR_CESE"
	| "JUBILACION"
	| "FALLECIMIENTO"
	| "OTRAS";

// -------------------------------------------------------------------
// ESCUELA
// -------------------------------------------------------------------

export type EscuelaResponseDTO = {
	id: number;
	nombre: string;
	localidad: string;
	direccion: string;
	telefono?: string;
};

export type EscuelaCreateDTO = z.infer<typeof crearEscuelaSchema>;

export type EscuelaUpdateDTO = z.infer<typeof crearEscuelaSchema>;

// -------------------------------------------------------------------
// LICENCIA
// -------------------------------------------------------------------

export type LicenciaCreateFormValues = z.input<typeof crearLicenciaSchema>;

export type LicenciaCreateDTO = {
	tipoLicencia: string;
	periodo: {
		fechaDesde: string;
		fechaHasta?: string;
	};
	descripcion?: string;
	designacionesIds: number[];
};

export type CubrirDesignacionesConSuplente = z.infer<
	typeof cubrirDesignacionesConSuplenteSchema
>;

export type LicenciaDetalleDTO = {
	id: number;
	empleado: EmpleadoEducativoMinimoDTO;
	normativa: NormativaDTO;
	descripcion: string;
	periodo: PeriodoCerradoDTO;
	estadoLicencia: EstadoLicencia;
};

export interface LicenciaResumenDTO {
	id: number;
	empleado: EmpleadoEducativoMinimoDTO;
	normativa: NormativaDTO;
	descripcion: string;
	periodo: PeriodoCerradoDTO;
	estadoLicencia: EstadoLicencia;
	diasRestantes: number;
}

export type TipoPeriodoLicencia = "ORIGINAL" | "RENOVACION";

export type LicenciaTimelineItemDTO = {
	id: number;
	tipo: TipoPeriodoLicencia;
	periodo: PeriodoAbiertoDTO;
};

export interface LicenciaDesignacionBaseDTO {
	designacionId: number;
	cupof: number;
	estado: EstadoDesignacion;
	rolEducativo: RolEducativo;
	asignacionActiva: AsignacionDetalleDTO | null;
}

export interface LicenciaDesignacionAdministrativaDTO
	extends LicenciaDesignacionBaseDTO {
	tipo: "ADMINISTRATIVA";
}

export interface LicenciaDesignacionCursoDTO
	extends LicenciaDesignacionBaseDTO {
	tipo: "CURSO";
	materia: string;
	curso: string;
	orientacion: string;
}

export type LicenciaDesignacionDTO =
	| LicenciaDesignacionAdministrativaDTO
	| LicenciaDesignacionCursoDTO;

export type CubrirDesignacionesRequest = {
	empleadoSuplenteId: number;
	designacionIds: number[];
	fechaInicio: string;
};

export type RenovarLicenciaDTO = {
	nuevoHasta: string;
	tipoLicencia: string;
	descripcion?: string;
};

export type LicenciaTimelineItem = LicenciaTimelineItemDTO;
export type LicenciaResumen = LicenciaResumenDTO;
export type LicenciaDetalle = LicenciaDetalleDTO;
export type LicenciaDesignacion = LicenciaDesignacionDTO;

export type DesignacionLicenciaAdministrativaItemDTO = {
	id: number;
	cupof: number;
	rolEducativo: string;
	tipoDesignacion: "ADMINISTRATIVA";
};

export type DesignacionLicenciaCursoItemDTO = {
	id: number;
	cupof: number;
	rolEducativo: string;
	tipoDesignacion: "CURSO";
	materia: MateriaNombreDTO;
	curso: CursoNombreDTO;
	orientacion: string;
};

export type DesignacionLicenciaItemDTO =
	| DesignacionLicenciaAdministrativaItemDTO
	| DesignacionLicenciaCursoItemDTO;

export type MateriaNombreDTO = {
	id: number;
	nombre: string;
};

// -------------------------------------------------------------------
// MATERIA
// -------------------------------------------------------------------

export type MateriaCreateDTO = z.infer<typeof crearMateriaSchema>;

export type MateriaUpdateDTO = z.infer<typeof crearMateriaSchema>;

export type MateriaResponseDTO = {
	id: number;
	nombre: string;
	abreviatura: string;
	cantidadModulos: number;
};

// -------------------------------------------------------------------
//
// -------------------------------------------------------------------

type FranjaHorariaBaseDTO = {
	dia: Dia;
	horaDesde: string;
	horaHasta: string;
};

export type FranjaHorariaCreateDTO = FranjaHorariaBaseDTO;

export type FranjaHorariaMinimoDTO = FranjaHorariaBaseDTO;

// -------------------------------------------------------------------

export type NormativaDTO = {
	codigo: string;
	articulo: string;
	descripcion: string;
};

export type PageResponse<T> = {
	content: T[];
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
	first: boolean;
	last: boolean;
};

export type SortDirection = "asc" | "desc";

export type SortState = {
	nombre?: SortDirection;
	apellido?: SortDirection;
	fechaDeIngreso?: SortDirection;
};

export type FranjaHoraria = {
	dia: Dia;
	horaDesde: string;
	horaHasta: string;
};

export type FormWithFranjas = {
	franjasHorarias: FranjaHoraria[];
};

export type BadgeConfig = {
	label: string;
	variant: BadgeVariant;
	icon?: LucideIcon;
};

// -------------------------------------------------------------------

export type LocationState = {
	empleado: EmpleadoEducativoMinimoDTO;
	licencia: LicenciaDetalleDTO;
};

export type CoberturaSeleccionada = {
	designacionId: number;
	secuencia: number;
	empleado: EmpleadoEducativoMinimoDTO | null;
	fechaTomaPosesion: string;
};

export interface EmpleadoEducativoAsignacionesDTO {
	empleado: EmpleadoEducativoBasicoDTO;
	asignaciones: AsignacionEmpleadoEducativoRowDTO[];
	total: number;
	tieneAsignacionActiva: boolean;
}
export interface EmpleadoEducativoLicenciasDTO {
	empleado: EmpleadoEducativoBasicoDTO;
	licencias: LicenciaEmpleadoEducativoRowDTO[];
	total: number;
	tieneLicenciaActiva: boolean;
}

export interface EmpleadoEducativoBasicoDTO {
	id: number;
	cuil: string;
	nombre: string;
	apellido: string;
	activo: boolean;
}
export type PeriodoDTO = PeriodoAbiertoDTO | PeriodoCerradoDTO;
export interface PeriodoAbiertoDTO {
	fechaDesde: string;
}
export interface PeriodoCerradoDTO {
	fechaDesde: string;
	fechaHasta: string;
	dias: number;
}
export interface LicenciaEmpleadoEducativoRowDTO {
	id: number;
	tipo: TipoLicencia;
	periodo: PeriodoCerradoDTO;
	normativa: LicenciaNormativaDTO;
	estado: EstadoLicencia;
	descripcion: string;
}

export interface LicenciaNormativaDTO {
	codigo: string;
	articulo: string;
	descripcion: string;
}

export type Tab = "DOCENTE" | "ADMINISTRATIVO";

export interface EmpleadoEducativoLicenciasDTO {
	empleado: EmpleadoEducativoBasicoDTO;
	licenciaActiva: LicenciaDetalleDTO | null;
	historial: LicenciaEmpleadoEducativoRowDTO[];
	totalHistorial: number;
}

export interface LicenciaEmpleadoEducativoRowDTO {
	id: number;
	tipo: TipoLicencia;
	periodo: PeriodoCerradoDTO;
	normativa: LicenciaNormativaDTO;
	estado: EstadoLicencia;
	descripcion: string;
}
