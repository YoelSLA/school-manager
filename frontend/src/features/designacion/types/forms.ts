import type z from "zod";
import type { FranjaHorariaDTO } from "@/shared/types/franjaHoraria";
import type { createDesignacionAdministrativaSchema } from "../form/schemas/createDesignacionAdministrativa.schema";
import type { createDesignacionCursoSchema } from "../form/schemas/createDesignacionCurso.schema";

export type FormWithFranjas = {
	franjasHorarias: FranjaHorariaDTO[];
};

export type DesignacionAdministrativaFormValues = z.input<
	typeof createDesignacionAdministrativaSchema
>;

export type DesignacionCursoFormValues = z.input<
	typeof createDesignacionCursoSchema
>;
