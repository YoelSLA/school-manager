import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { BajaDefinitivaDTO } from "@/utils/types";
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
