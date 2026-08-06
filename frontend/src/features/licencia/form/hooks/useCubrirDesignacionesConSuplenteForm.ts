import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadoEducativo/types";
import { useCubrirDesignacionesConSuplente } from "../../hooks/mutations/useCubrirDesignacionesConSuplente";
import { cubrirDesignacionesConSuplenteSchema } from "../schemas/cubrirDesignacionesConSuplente.schema";

type Props = {
	licenciaId: number;
	designacionIds: number[];
	onSuccess: () => void;
};

export function useCubrirDesignacionesConSuplenteForm({
	licenciaId,
	designacionIds,
	onSuccess,
}: Props) {
	const [suplente, setSuplente] = useState<EmpleadoEducativoBasicoDTO | null>(
		null,
	);

	const formSchema = cubrirDesignacionesConSuplenteSchema.pick({
		fechaTomaPosesion: true,
		secuencia: true,
	});

	type FormValues = z.input<typeof formSchema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fechaTomaPosesion: "",
			secuencia: 1,
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
				secuencia: Number(data.secuencia),
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
