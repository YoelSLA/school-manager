import { EmpleadoEducativoMinimoDTO } from "./empleadoEducativo";

export type LicenciaCreateDTO = {
  fechaDesde: string;
  fechaHasta: string;
  tipoLicencia: string;
  descripcion?: string;
};

type LicenciaBaseDTO = {
  id: number;
  empleado: EmpleadoEducativoMinimoDTO;
  codigo: string;
  articulo: string;
  descripcion: string;
  fechaDesde: string;
  fechaHasta: string;
  aplicaHoy: boolean;
};

export type LicenciaResumenDTO = LicenciaBaseDTO;

export type LicenciaDetalleDTO = LicenciaBaseDTO & {
  descripcionLicencia: string;
};
