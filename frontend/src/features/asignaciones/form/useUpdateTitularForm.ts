import type { CubrirTitularDTO } from "@/shared/utils/types";
import { CaracteristicaAsignacion } from "@/shared/utils/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { updateTitularSchema } from "./updateTitular.schema";

type Props = {
	defaultValues?: Partial<CubrirTitularDTO>;
};

type FormInput = z.input<typeof updateTitularSchema>;
type FormOutput = z.output<typeof updateTitularSchema>;

export function useUpdateTitularForm({ defaultValues }: Props = {}) {
	const form = useForm<FormInput, any, FormOutput>({
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
