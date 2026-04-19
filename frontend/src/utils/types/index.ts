import type { cubrirProvisionalSchema } from "@/features/asignaciones/form/cubrirProvisional.schema";
import type { cubrirTitularSchema } from "@/features/asignaciones/form/cubrirTitular.schema";
import type { editarProvisionalSchema } from "@/features/asignaciones/form/editarProvisional.schema";
import type { editarTitularSchema } from "@/features/asignaciones/form/editarTitular.schema";
import type { Params } from "react-router-dom";
import type z from "zod";
import type { Dia, EstadoAsignacion, EstadoDesignacion, EstadoLicencia, RolEducativo, SituacionDeRevista } from "./enums";
import type { crearCursoSchema } from "@/features/cursos/form/crearCurso.schema";
import type { crearDesignacionAdministrativaSchema } from "@/features/designaciones/form/schemas/crearDesignacionAdministrativa.schema";
import type { crearDesignacionCursoSchema } from "@/features/designaciones/form/schemas/crearDesignacionCurso.schema";
import type { editarDesignacionAdministrativaSchema } from "@/features/designaciones/form/schemas/editarDesignacionAdministrativa.schema";
import type { editarDesignacionCursoSchema } from "@/features/designaciones/form/schemas/editarDesignacionCurso.schema";
import type { crearEmpleadoEducativoSchema } from "@/features/empleadosEducativos/form/schemas/crearEmpleadoEducativo.schema";
import type { editarEmpleadoEducativoSchema } from "@/features/empleadosEducativos/form/schemas/editarEmpleadoEducativo.schema";
import type { darBajaEmpleadoEducativo } from "@/features/empleadosEducativos/form/schemas/darBajaEmpleadoEducativo.schema";
import type { crearEscuelaSchema } from "@/features/escuelas/form/crearEscuela.schema";
import type { crearLicenciaSchema } from "@/features/licencias/form/crearLicencia.schema";
import type { cubrirDesignacionesConSuplenteSchema } from "@/features/licencias/form/cubrirDesignacionesConSuplente.schema";
import type { crearMateriaSchema } from "@/features/materias/form/schemas/crearMateria.schema";
import type { BadgeVariant } from "@/components/Badge/Badge.types";
import type { LucideIcon } from "lucide-react";

// -------------------------------------------------------------------
// ASIGNACION
// -------------------------------------------------------------------

export type CubrirTitularDTO = z.infer<typeof cubrirTitularSchema>;

export type CubrirProvisionalDTO = z.infer<typeof cubrirProvisionalSchema>;

export type EditarTitularDTO = z.infer<typeof editarTitularSchema>;

export type EditarProvisionalDTO = z.infer<typeof editarProvisionalSchema>;

export type AsignacionDetalleDTO = {
  id: number;
  empleado: EmpleadoEducativoMinimoDTO;
  periodo: PeriodoAbiertoDTO;
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
  roles: string[];
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

export type DesignacionAdministrativaCreateDTO = z.infer<
  typeof crearDesignacionAdministrativaSchema
>;

export type DesignacionCursoCreateDTO = z.infer<
  typeof crearDesignacionCursoSchema
>;

export type DesignacionAdministrativaUpdateDTO = z.infer<
  typeof editarDesignacionAdministrativaSchema
>;

export type DesignacionCursoUpdateDTO = z.infer<
  typeof editarDesignacionCursoSchema
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

export type BajaDefinitivaDTO = z.infer<
  typeof darBajaEmpleadoEducativo
>;

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

export type EscuelaCreateDTO = z.infer<
  typeof crearEscuelaSchema
>;

export type EscuelaUpdateDTO = z.infer<
  typeof crearEscuelaSchema
>;

// -------------------------------------------------------------------
// LICENCIA
// -------------------------------------------------------------------

export type LicenciaCreateDTO = z.infer<
  typeof crearLicenciaSchema
>;

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
  designaciones: LicenciaDesignacionDTO[];
  timeline: LicenciaTimelineItemDTO[];
};

export interface LicenciaResumenDTO {
  id: number;
  empleado: EmpleadoEducativoMinimoDTO;
  normativa: NormativaDTO;
  descripcion: string;
  periodo: PeriodoCerradoDTO;
  estadoLicencia: EstadoLicencia;
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

export type MateriaCreateDTO = z.infer<
  typeof crearMateriaSchema
>;

export type MateriaUpdateDTO = z.infer<
  typeof crearMateriaSchema
>;

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

export type PeriodoCerradoDTO = PeriodoDTO & {
  fechaHasta: string;
};

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

type PeriodoDTO = {
  fechaDesde: string;
  dias: number;
};

export type PeriodoAbiertoDTO = PeriodoDTO & {
  fechaHasta: string | null;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  sort: string | undefined;
};

export type SortDirection = "asc" | "desc";

export type SortState = {
  nombre?: SortDirection;
  apellido?: SortDirection;
  fechaDeIngreso?: SortDirection;
};

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

export type BreadcrumbState = {
  from?: string;
  label?: string;
  skipBase?: boolean;
  dynamicLabels?: Record<string, string>;
};

export type BreadcrumbResolver =
  | BreadcrumbItem[]
  | ((params: Params<string>) => BreadcrumbItem[]);

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
  licencia: LicenciaDetalleDTO
};

export type CoberturaSeleccionada = {
  designacionId: number;
  secuencia: number;
  empleado: EmpleadoEducativoMinimoDTO | null;
  fechaTomaPosesion: string;
};
