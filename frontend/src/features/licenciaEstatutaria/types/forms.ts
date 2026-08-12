import type z from "zod";
import type {
	licenciaEstatutariaCreateSchema,
	licenciaEstatutariaUpdateSchema,
} from "../form/schemas";

export type LicenciaEstatutariaCreateFormValues = z.input<
	typeof licenciaEstatutariaCreateSchema
>;

export type LicenciaEstatutariaCreateDTO = z.output<
	typeof licenciaEstatutariaCreateSchema
>;

export type LicenciaEstatutariaUpdateFormValues = z.input<
	typeof licenciaEstatutariaUpdateSchema
>;

export type LicenciaEstatutariaUpdateDTO = z.output<
	typeof licenciaEstatutariaUpdateSchema
>;
