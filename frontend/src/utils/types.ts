export type LicenciaResponseDTO = {
  id: number;
  designacionId: number;
  empleado: {
    cuil: string;
    nombre: string;
    apellido: string;
  };
  fechaDesde: string;
  fechaHasta: string;
  activa: boolean;
  cubierta: boolean;
  situacionDeRevista: string;
  cupof: number;
  codigo: string;
  articulo: string;
  descripcion: string;
};

export interface CrearLicenciaDTO {
  fechaDesde: string;
  fechaHasta: string;
  tipo: string;
  motivo?: string;
}

export type Escuela = {
  id: number;
  nombre: string;
  localidad: string;
  direccion: string;
  telefono?: string;
};

export enum RolEducativo {
  DIRECCION = "DIRECCION",
  VICEDIRECCION = "VICEDIRECCION",
  SECRETARIA = "SECRETARIA",
  ORIENTACION_EDUCACIONAL = "ORIENTACION_EDUCACIONAL",
  ORIENTACION_SOCIAL = "ORIENTACION_SOCIAL",
  PRECEPTORIA = "PRECEPTORIA",
  DOCENTE = "DOCENTE",
  AUXILIAR = "AUXILIAR",
  SIN_CARGO = "SIN_CARGO",
  ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL = "ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL",
}

export const rolEducativoLabels: Record<RolEducativo, string> = {
  [RolEducativo.DIRECCION]: "Dirección",
  [RolEducativo.VICEDIRECCION]: "Vicedirección",
  [RolEducativo.SECRETARIA]: "Secretaría",
  [RolEducativo.ORIENTACION_EDUCACIONAL]: "Orientación Educacional",
  [RolEducativo.ORIENTACION_SOCIAL]: "Orientación Social",
  [RolEducativo.PRECEPTORIA]: "Preceptoría",
  [RolEducativo.DOCENTE]: "Docente",
  [RolEducativo.AUXILIAR]: "Auxiliar",
  [RolEducativo.SIN_CARGO]: "Sin cargo",
  [RolEducativo.ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL]:
    "Encargo de Medio de Apoyo Técnico Profesional",
};

export interface EmpleadoEducativoCreateDTO {
  cuil: string;
  nombre: string;
  apellido: string;
  domicilio: string;
  telefono: string;
  email: string;
  fechaDeNacimiento: string;
  fechaDeIngreso: string;
}

export interface EmpleadoEducativoResponseDTO {
  id: number;
  cuil: string;
  nombre: string;
  apellido: string;
  domicilio: string;
  telefono: string;
  email: string;
  activo: boolean;
  fechaDeNacimiento: string;
  fechaDeIngreso: string;
}

export interface FranjaHorariaCreateDTO {
  dia: string;
  horaDesde: string;
  horaHasta: string;
}

export interface DesignacionAdministrativaCreateDTO {
  cupof: number;
  franjasHorarias: FranjaHorariaCreateDTO[];
  rolEducativo: RolEducativo;
}

export interface FranjaHorariaResponseDTO {
  dia: string;
  horaDesde: string;
  horaHasta: string;
}

export interface DesignacionAdministrativaResponseDTO {
  id: number;
  cupof: number;
  rolEducativo: string;
  nombreEscuela: string;
  franjasHorarias: FranjaHorariaResponseDTO[];
}

export interface AsignacionSimpleResponseDTO {
  id: number;
  situacionDeRevista: string;
  empleado: EmpleadoEducativoBasicoResponseDTO;
  fechaTomaPosesion: string;
  fechaCese?: string;
  cubierta: boolean;
  enLicencia: boolean;
  vigente: boolean;
}

export interface DesignacionAdministrativaCompletaDTO {
  id: number;
  cupof: number;
  rolEducativo: string;
  asignaciones: AsignacionSimpleResponseDTO[];
  franjasHorarias: FranjaHorariaResponseDTO[];
}

export interface EmpleadoEducativoBasicoResponseDTO {
  cuil: string;
  nombre: string;
  apellido: string;
}

export type EmpleadoOption = {
  id: number;
  cuil: string;
  apellido: string;
  nombre: string;
};

export interface EmpleadoSimpleResponseDTO {
  id: number;
  cuil: string;
  nombre: string;
  apellido: string;
}

export interface DesignacionCursoResumenDTO {
  id: number;
  cupof: number;
  materia: string;
  curso: string;
  orientacion: string;
  rolEducativo: string;
  franjasHorarias: FranjaHorariaResponseDTO[];
}

export type HubItem = {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
};
