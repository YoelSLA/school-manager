import { useState } from "react";
import { useCubrirConTitular } from "../../hooks/useCubrirConTitular";
import { useCubrirConProvisional } from "../../hooks/useCubrirConProvisional";
import { useCubrirConTitularForm } from "../../form/useCubrirConTitularForm";
import { useCubrirConProvisionalForm } from "../../form/useCubrirConProvisionalForm";
import type { CubrirTitularFormValues } from "../../form/cubrirTitular.schema";
import type { CubrirProvisionalFormValues } from "../../form/cubrirProvisional.schema";
import AsignacionModalBase from "../AsignacionModalBase/AsignacionModalBase";

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

	const [tipoAsignacion, setTipoAsignacion] =
		useState<"TITULAR" | "PROVISIONAL">("TITULAR");

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
		data: CubrirTitularFormValues & { empleadoId: number | null }
	) => {
		if (!data.empleadoId) return;

		await cubrirTitular.mutateAsync({
			empleadoId: data.empleadoId,
			fechaTomaPosesion: data.fechaTomaPosesion,
			caracteristica: data.caracteristica,
		});
	};

	const handleProvisionalSubmit = async (
		data: CubrirProvisionalFormValues & { empleadoId: number | null }
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