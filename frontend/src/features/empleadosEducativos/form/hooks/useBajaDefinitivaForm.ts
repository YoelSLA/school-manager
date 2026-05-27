import type { BajaDefinitivaDTO } from "@/shared/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { darBajaEmpleadoEducativo } from "../schemas/darBajaEmpleadoEducativo.schema";

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
