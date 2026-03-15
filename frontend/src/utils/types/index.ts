import { cubrirProvisionalSchema } from "@/features/asignaciones/form/cubrirProvisional.schema";
import { cubrirTitularSchema } from "@/features/asignaciones/form/cubrirTitular.schema";
import { editarProvisionalSchema } from "@/features/asignaciones/form/editarProvisional.schema";
import { editarTitularSchema } from "@/features/asignaciones/form/editarTitular.schema";
import type { Params } from "react-router-dom";
import z from "zod";
import { EstadoAsignacion, EstadoDesignacion, EstadoLicencia, RolEducativo, SituacionDeRevista } from "./enums";
import { crearCursoSchema } from "@/features/cursos/form/crearCurso.schema";
import { crearDesignacionAdministrativaSchema } from "@/features/designaciones/form/schemas/crearDesignacionAdministrativa.schema";
import { crearDesignacionCursoSchema } from "@/features/designaciones/form/schemas/crearDesignacionCurso.schema";
import { editarDesignacionAdministrativaSchema } from "@/features/designaciones/form/schemas/editarDesignacionAdministrativa.schema";
import { editarDesignacionCursoSchema } from "@/features/designaciones/form/schemas/editarDesignacionCurso.schema";
import { crearEmpleadoEducativoSchema } from "@/features/empleadosEducativos/form/schemas/crearEmpleadoEducativo.schema";
import { editarEmpleadoEducativoSchema } from "@/features/empleadosEducativos/form/schemas/editarEmpleadoEducativo.schema";
import { darBajaEmpleadoEducativo } from "@/features/empleadosEducativos/form/schemas/darBajaEmpleadoEducativo.schema";
import { crearEscuelaSchema } from "@/features/escuelas/form/crearEscuela.schema";
import { crearLicenciaSchema } from "@/features/licencias/form/crearLicencia.schema";
import { cubrirDesignacionesConSuplenteSchema } from "@/features/licencias/form/cubrirDesignacionesConSuplente.schema";
import { crearMateriaSchema } from "@/features/materias/form/schemas/crearMateria.schema";

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
};

export type FiltroCargos = "LICENCIA" | "FINALIZADA" | "BAJA";

export type EditarAsignacionDTO = {
  empleadoId: number;
  fechaTomaPosesion: string;
  fechaCese?: string | null;
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
  tipoDesignacion: string;
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

export type PeriodoCreateDTO = {
  fechaDesde: string;
  fechaHasta?: string | null;
};

type PeriodoDTO = {
  fechaDesde: string;
  dias: number;
};

export type PeriodoAbiertoDTO = PeriodoDTO & {
  fechaHasta: string | null;
};

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

export enum Dia {
  LUNES = "Lunes",
  MARTES = "Martes",
  MIERCOLES = "Miércoles",
  JUEVES = "Jueves",
  VIERNES = "Viernes",
}

