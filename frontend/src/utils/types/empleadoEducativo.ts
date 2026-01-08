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
}
export interface EmpleadoEducativoMinimoDTO {
  id: number;
  cuil: string;
  nombre: string;
  apellido: string;
}
