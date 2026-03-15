import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cubrirProvisionalSchema } from "./cubrirProvisional.schema";
import { CubrirProvisionalDTO } from "@/utils/types";

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
