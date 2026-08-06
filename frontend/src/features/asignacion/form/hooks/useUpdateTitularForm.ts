import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { CaracteristicaAsignacion } from "@/shared/types/enums";
import type { CubrirTitularDTO } from "../../types";
import { updateTitularSchema } from "../schemas";

type FormInput = z.input<typeof updateTitularSchema>;
type FormOutput = z.output<typeof updateTitularSchema>;

type Props = {
	defaultValues?: Partial<CubrirTitularDTO>;
	onSubmit: (data: FormOutput) => void | Promise<void>;
};

export function useUpdateTitularForm({ defaultValues, onSubmit }: Props) {
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

	const handleFormSubmit = form.handleSubmit(onSubmit);

	return {
		register: form.register,
		errors: form.formState.errors,
		setValue: form.setValue,
		handleFormSubmit,
	};
}
