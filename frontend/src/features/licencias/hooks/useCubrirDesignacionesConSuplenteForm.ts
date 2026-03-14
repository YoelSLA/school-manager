import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { EmpleadoEducativoMinimoDTO } from "@/features/empleadosEducativos/types/empleadosEducativos.types";
import {
	type CubrirDesignacionesConSuplente,
	cubrirDesignacionesConSuplenteSchema,
} from "../form/cubrirDesignacionesConSuplente.schema";
import { useCubrirDesignacionesConSuplente } from "./useCubrirDesignacionesConSuplente";

type Props = {
	licenciaId: number;
	designacionIds: number[];
	onSuccess: () => void;
};

export function useCubrirDesignacionesForm({
	licenciaId,
	designacionIds,
	onSuccess,
}: Props) {
	const [suplente, setSuplente] = useState<EmpleadoEducativoMinimoDTO | null>(
		null,
	);

	const form = useForm<
		Pick<CubrirDesignacionesConSuplente, "fechaTomaPosesion">
	>({
		resolver: zodResolver(
			cubrirDesignacionesConSuplenteSchema.pick({
				fechaTomaPosesion: true,
			}),
		),
		defaultValues: {
			fechaTomaPosesion: "",
		},
	});

	const { mutateAsync, isPending } = useCubrirDesignacionesConSuplente();

	const onSubmit = form.handleSubmit(async (data) => {
		if (!suplente) {
			form.setError("root", {
				message: "Debe seleccionar un suplente",
			});
			return;
		}

		await mutateAsync({
			licenciaId,
			body: {
				empleadoId: suplente.id,
				designacionesIds: designacionIds,
				fechaTomaPosesion: data.fechaTomaPosesion,
			},
		});

		onSuccess();
	});

	return {
		...form,
		onSubmit,
		setSuplente,
		suplente,
		isPending,
	};
}
