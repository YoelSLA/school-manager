import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { createProvisionalSchema } from "../schemas";

type FormInput = z.input<typeof createProvisionalSchema>;
type FormOutput = z.output<typeof createProvisionalSchema>;

type Props = {
	defaultValues?: Partial<FormOutput>;
	onSubmit: (data: FormOutput) => void | Promise<void>;
};

export function useCreateProvisionalForm({ defaultValues, onSubmit }: Props) {
	const form = useForm<FormInput, undefined, FormOutput>({
		resolver: zodResolver(createProvisionalSchema),
		defaultValues: {
			empleadoId: undefined,
			fechaTomaPosesion: undefined,
			fechaCese: undefined,
			secuencia: 1,
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
