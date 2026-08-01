import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { CaracteristicaAsignacion } from "@/shared/types/enums";
import type { CubrirTitularDTO } from "../types";
import { updateTitularSchema } from "./schemas/updateTitular.schema";

type Props = {
	defaultValues?: Partial<CubrirTitularDTO>;
};

type FormInput = z.input<typeof updateTitularSchema>;
type FormOutput = z.output<typeof updateTitularSchema>;

export function useUpdateTitularForm({ defaultValues }: Props = {}) {
	const form = useForm<FormInput, undefined, FormOutput>({
		resolver: zodResolver(updateTitularSchema),

		defaultValues: {
			empleadoId: undefined,
			secuencia: 1,
			fechaTomaPosesion: undefined,
			caracteristica: CaracteristicaAsignacion.NORMAL,
			...defaultValues,
		},

		mode: "onSubmit",
	});

	return { form };
}
