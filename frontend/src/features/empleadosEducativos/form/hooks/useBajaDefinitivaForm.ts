import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type {
	BajaDefinitivaInput,
	BajaDefinitivaOutput,
} from "../empleadoEducativo.form.types";
import { darBajaEmpleadoEducativo } from "../schemas/darBajaEmpleadoEducativo.schema";

export function useBajaDefinitivaForm() {
	const form = useForm<BajaDefinitivaInput, unknown, BajaDefinitivaOutput>({
		resolver: zodResolver(darBajaEmpleadoEducativo),
		defaultValues: {
			causa: undefined,
		},
	});

	return {
		form,
	};
}
