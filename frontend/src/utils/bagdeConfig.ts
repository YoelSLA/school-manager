import { Clock, Repeat, Star } from "lucide-react";
import type {
  EstadoAsignacion,
  EstadoDesignacion,
  SituacionDeRevista,
  EstadoLicencia,
} from "./types/enums";
import type { BadgeConfig } from "./types";


/* =========================
        DESIGNACIÓN
========================= */

export const ESTADO_DESIGNACION_CONFIG: Record<
  EstadoDesignacion,
  BadgeConfig
> = {
  CUBIERTA: {
    label: "Cubierta",
    variant: "cubierta",
  },

  LICENCIA: {
    label: "Licencia",
    variant: "licencia",
  },

  VACANTE: {
    label: "Vacante",
    variant: "vacante",
  },
};

/* =========================
        ASIGNACIÓN
========================= */

export const ESTADO_ASIGNACION_CONFIG: Record<
  EstadoAsignacion,
  BadgeConfig
> = {
  ACTIVA: {
    label: "Activa",
    variant: "activa",
  },

  LICENCIA: {
    label: "Licencia",
    variant: "licencia",
  },

  FINALIZADA: {
    label: "Finalizada",
    variant: "finalizada",
  },

  BAJA: {
    label: "Baja",
    variant: "baja",
  },

  PENDIENTE: {
    label: "Pendiente",
    variant: "pendiente",
  },
};

/* =========================
        LICENCIA
========================= */

export const ESTADO_LICENCIA_CONFIG: Record<
  EstadoLicencia,
  BadgeConfig
> = {
  CUBIERTA: {
    label: "Cubierta",
    variant: "cubierta",
  },

  DESCUBIERTA: {
    label: "Descubierta",
    variant: "descubierta",
  },

  INACTIVA: {
    label: "Inactiva",
    variant: "inactiva",
  },
};

/* =========================
        EMPLEADO
========================= */

export const ESTADO_EMPLEADO_CONFIG = {
  ACTIVO: {
    label: "Activo",
    variant: "activa",
  },

  INACTIVO: {
    label: "Inactivo",
    variant: "inactiva",
  },
} as const satisfies Record<"ACTIVO" | "INACTIVO", BadgeConfig>;

export function getEstadoEmpleadoKey(
  activo: boolean,
): keyof typeof ESTADO_EMPLEADO_CONFIG {
  return activo ? "ACTIVO" : "INACTIVO";
}

/* =========================
      SITUACIÓN REVISTA
========================= */

export const SITUACION_REVISTA_CONFIG: Record<
  SituacionDeRevista,
  BadgeConfig
> = {
  Titular: {
    label: "Titular",
    variant: "activa",
    icon: Star,
  },

  Provisional: {
    label: "Provisional",
    variant: "licencia",
    icon: Clock,
  },

  Suplente: {
    label: "Suplente",
    variant: "pendiente",
    icon: Repeat,
  },
};