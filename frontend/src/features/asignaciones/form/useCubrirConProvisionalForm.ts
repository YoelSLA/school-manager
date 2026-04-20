import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { CubrirProvisionalDTO } from "@/utils/types";
import { cubrirProvisionalSchema } from "./cubrirProvisional.schema";

export function useCubrirConProvisionalForm() {
	const form = useForm<CubrirProvisionalDTO>({
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
