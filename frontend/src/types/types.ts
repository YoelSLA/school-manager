export enum RolEducativo {
  DIRECCION = "DIRECCION",
  VICEDIRECCION = "VICEDIRECCION",
  SECRETARIA = "SECRETARIA",
  ORIENTACION_EDUCACIONAL = "ORIENTACION_EDUCACIONAL",
  ORIENTACION_SOCIAL = "ORIENTACION_SOCIAL",
  PRECEPTORIA = "PRECEPTORIA",
  DOCENTE = "DOCENTE",
  CAMBIO_DE_FUNCION = "CAMBIO_DE_FUNCION",
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
  [RolEducativo.CAMBIO_DE_FUNCION]: "Cambio de función",
  [RolEducativo.AUXILIAR]: "Auxiliar",
  [RolEducativo.SIN_CARGO]: "Sin cargo",
  [RolEducativo.ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL]:
    "Encargo de Medio de Apoyo Técnico Profesional",
};

export interface EmpleadoEducativo {
  apellido: string;
  cuil: string;
  domicilio: string;
  escuelaId: string;
  fechaDeIngreso: string;
  fechaDeNacimiento: string;
  nombre: string;
  rol: string;
  telefono: string;
}
