import { useState } from "react";
import { useCubrirConProvisionalForm } from "../../form/useCubrirConProvisionalForm";
import { useCubrirConTitularForm } from "../../form/useCubrirConTitularForm";
import { useCubrirConProvisional } from "../../hooks/useCubrirConProvisional";
import { useCubrirConTitular } from "../../hooks/useCubrirConTitular";
import AsignacionModalBase from "../AsignacionModalBase/AsignacionModalBase";
import { CubrirProvisionalDTO, CubrirTitularDTO } from "@/utils/types";

type Props = {
	designacionId: number;
	onClose: () => void;
	onSuccess: () => void;
};

export default function CrearAsignacionModal({
	designacionId,
	onClose,
	onSuccess,
}: Props) {
	const [tipoAsignacion, setTipoAsignacion] = useState<
		"TITULAR" | "PROVISIONAL"
	>("TITULAR");

	const cubrirTitular = useCubrirConTitular({
		designacionId,
		onClose,
		onSuccess,
	});

	const cubrirProvisional = useCubrirConProvisional({
		designacionId,
		onClose,
		onSuccess,
	});

	const titularForm = useCubrirConTitularForm();
	const provisionalForm = useCubrirConProvisionalForm();

	const handleTitularSubmit = async (
		data: CubrirTitularDTO & { empleadoId: number | null },
	) => {
		if (!data.empleadoId) return;

		await cubrirTitular.mutateAsync({
			empleadoId: data.empleadoId,
			fechaTomaPosesion: data.fechaTomaPosesion,
			caracteristica:
				data.caracteristica === "NORMAL" ? undefined : data.caracteristica,
		});
	};

	const handleProvisionalSubmit = async (
		data: CubrirProvisionalDTO & { empleadoId: number | null },
	) => {
		if (!data.empleadoId) return;

		await cubrirProvisional.mutateAsync({
			empleadoId: data.empleadoId,
			fechaTomaPosesion: data.fechaTomaPosesion,
			fechaCese: data.fechaCese,
		});
	};

	return (
		<AsignacionModalBase
			title="Crear asignación"
			tipoAsignacion={tipoAsignacion}
			setTipoAsignacion={setTipoAsignacion}
			titularForm={titularForm.form}
			provisionalForm={provisionalForm.form}
			onTitularSubmit={handleTitularSubmit}
			onProvisionalSubmit={handleProvisionalSubmit}
			onClose={onClose}
		/>
	);
}
