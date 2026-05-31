import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { createProvisionalSchema } from "./createProvisional.schema";

// 👇 separar input y output
type FormInput = z.input<typeof createProvisionalSchema>;
type FormOutput = z.output<typeof createProvisionalSchema>;

type Props = {
	defaultValues?: Partial<FormOutput>;
};

export function useCreateProvisionalForm({ defaultValues }: Props = {}) {
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

	return { form };
}
