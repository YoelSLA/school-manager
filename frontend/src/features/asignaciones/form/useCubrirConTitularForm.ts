import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cubrirTitularSchema } from "./cubrirTitular.schema";
import { CubrirTitularDTO } from "@/utils/types";
import { CaracteristicaAsignacion } from "@/utils/types/enums";

type Props = {
	defaultValues?: Partial<CubrirTitularDTO>;
};

export function useCubrirConTitularForm({ defaultValues }: Props = {}) {
	const form = useForm<CubrirTitularDTO>({
		resolver: zodResolver(cubrirTitularSchema),

		defaultValues: {
			empleadoId: undefined,
			fechaTomaPosesion: undefined,
			caracteristica: CaracteristicaAsignacion.NORMAL,
			...defaultValues,
		},

		mode: "onSubmit",
	});

	return { form };
}
