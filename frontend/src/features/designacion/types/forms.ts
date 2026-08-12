import type z from "zod";

import type { FranjaHorariaDTO } from "@/shared/types/franjaHoraria";

import type {
	designacionAdministrativaSchemaCreate,
	designacionAdministrativaSchemaUpdate,
	designacionCursoSchemaCreate,
	designacionCursoSchemaUpdate,
} from "../form/schemas";

export type FormWithFranjas = {
	franjasHorarias: FranjaHorariaDTO[];
};

export type DesignacionAdministrativaFormValues = z.input<
	typeof designacionAdministrativaSchemaCreate
>;

export type DesignacionCursoFormValues = z.input<
	typeof designacionCursoSchemaCreate
>;

export type DesignacionAdministrativaCreateDTO = z.output<
	typeof designacionAdministrativaSchemaCreate
>;

export type DesignacionCursoCreateDTO = z.output<
	typeof designacionCursoSchemaCreate
>;

export type DesignacionAdministrativaUpdateDTO = z.output<
	typeof designacionAdministrativaSchemaUpdate
>;

export type DesignacionCursoUpdateDTO = z.output<
	typeof designacionCursoSchemaUpdate
>;
