import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { darBajaEmpleadoEducativo } from "../schemas/darBajaEmpleadoEducativo.schema";
import { BajaDefinitivaDTO } from "@/utils/types";

export function useBajaDefinitivaForm() {
	const form = useForm<BajaDefinitivaDTO>({
		resolver: zodResolver(darBajaEmpleadoEducativo),
		defaultValues: {
			causa: undefined,
		},
	});

	return {
		form,
	};
}
