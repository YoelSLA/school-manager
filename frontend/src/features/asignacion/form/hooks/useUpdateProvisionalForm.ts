import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import type { CubrirProvisionalDTO } from "../../types";
import { updateProvisionalSchema } from "../schemas";

type FormInput = z.input<typeof updateProvisionalSchema>;
type FormOutput = z.output<typeof updateProvisionalSchema>;

type Props = {
	defaultValues?: Partial<CubrirProvisionalDTO>;
	onSubmit: (data: FormOutput) => void | Promise<void>;
};

export function useUpdateProvisionalForm({ defaultValues, onSubmit }: Props) {
	const form = useForm<FormInput, undefined, FormOutput>({
		resolver: zodResolver(updateProvisionalSchema),

		defaultValues: {
			empleadoId: undefined,
			secuencia: 1,
			fechaTomaPosesion: undefined,
			fechaCese: undefined,
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
