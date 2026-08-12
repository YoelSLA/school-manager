import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadoEducativo/types";
import type { LicenciaDetalleDTO } from "@/features/licencia/types";
import type { RolEducativo } from "./enums";

export type LocationState = {
	empleado: EmpleadoEducativoBasicoDTO;
	licencia: LicenciaDetalleDTO;
};

export type NavigationState = {
	dynamicLabels?: Record<string, string>;
	empleado: {
		nombre: string;
		apellido: string;
		cuil: string;
		roles: RolEducativo[];
	};
};
