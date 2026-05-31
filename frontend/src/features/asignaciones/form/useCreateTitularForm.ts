import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import type { CubrirTitularDTO } from "@/shared/utils/types";
import { CaracteristicaAsignacion } from "@/shared/utils/types/enums";
import { createTitularSchema } from "./createTitular.schema";

type Props = {
	defaultValues?: Partial<CubrirTitularDTO>;
};

type FormInput = z.input<typeof createTitularSchema>;
type FormOutput = z.output<typeof createTitularSchema>;

export function useCreateTitularForm({ defaultValues }: Props = {}) {
	const form = useForm<FormInput, undefined, FormOutput>({
		resolver: zodResolver(createTitularSchema),

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
