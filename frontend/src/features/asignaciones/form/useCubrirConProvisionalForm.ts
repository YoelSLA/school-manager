import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { cubrirProvisionalSchema } from "./cubrirProvisional.schema";

type ProvisionalFormValues = z.infer<typeof cubrirProvisionalSchema>;

export function useCubrirConProvisionalForm() {
	const form = useForm<ProvisionalFormValues>({
		resolver: zodResolver(cubrirProvisionalSchema),

		defaultValues: {
			empleadoId: undefined,
			fechaTomaPosesion: undefined,
			fechaCese: undefined,
		},

		mode: "onSubmit",
	});

	return { form };
}
