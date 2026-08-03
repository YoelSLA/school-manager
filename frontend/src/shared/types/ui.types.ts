import type { LucideIcon } from "lucide-react";
import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadoEducativo/types";
import type { LicenciaDetalleDTO } from "@/features/licencia/types";
import type { BadgeVariant } from "@/shared/components/Badge/Badge.types";
import type { FranjaHorariaDTO } from "@/shared/types/common.types";
import type { RolEducativo } from "@/shared/types/enums";

// FILTROS
export type CursoFiltro = "TODOS" | "MANIANA" | "TARDE" | "VESPERTINO";
export type FiltroCargos = "FINALIZADA" | "BAJA";
export type Tab = "DOCENTE" | "ADMINISTRATIVO";
export type EmpleadoEducativoFiltro = "TODOS" | "ACTIVOS" | "INACTIVOS";
export type DesignacionFiltro = "ADMIN" | "CURSO";
export type EstadoCargo = "LICENCIA" | "BAJA" | "FINALIZADA" | "PENDIENTE";
export type EstadoVisual = "presente" | "ausente" | null;

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

export type LocationState = {
	empleado: EmpleadoEducativoBasicoDTO;
	licencia: LicenciaDetalleDTO;
};

export type FormWithFranjas = {
	franjasHorarias: FranjaHorariaDTO[];
};

export type BadgeConfig = {
	label: string;
	variant: BadgeVariant;
	icon?: LucideIcon;
};

export type SortDirection = "asc" | "desc";

export type SortState = {
	nombre?: SortDirection;
	apellido?: SortDirection;
	fechaDeIngreso?: SortDirection;
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

export interface TipoLicencia {
	enumValue: string;
	articulo: string | null;
	codigo: string;
	descripcion: string;
}
