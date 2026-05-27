import type { CubrirProvisionalDTO } from "@/shared/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { updateProvisionalSchema } from "./updateProvisional.schema";

type Props = {
	defaultValues?: Partial<CubrirProvisionalDTO>;
};

type FormInput = z.input<typeof updateProvisionalSchema>;
type FormOutput = z.output<typeof updateProvisionalSchema>;

export function useUpdateProvisionalForm({ defaultValues }: Props = {}) {
	const form = useForm<FormInput, any, FormOutput>({
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

	return { form };
}
