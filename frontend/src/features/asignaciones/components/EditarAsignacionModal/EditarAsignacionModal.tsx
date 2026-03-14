import { useState } from "react";
import type { AsignacionDetalleDTO } from "@/features/asignaciones/types/asignacion.types";
import type { CubrirProvisionalFormValues } from "../../form/cubrirProvisional.schema";
import type { CubrirTitularFormValues } from "../../form/cubrirTitular.schema";
import { useCubrirConProvisionalForm } from "../../form/useCubrirConProvisionalForm";
import { useCubrirConTitularForm } from "../../form/useCubrirConTitularForm";
import { useEditarAsignacion } from "../../hooks/useEditarAsignacion";
import AsignacionModalBase from "../AsignacionModalBase/AsignacionModalBase";

type Props = {
	asignacion: AsignacionDetalleDTO;
	designacionId: number;
	onClose: () => void;
	onSuccess: () => void;
};

export default function EditarAsignacionModal({
	asignacion,
	designacionId,
	onClose,
	onSuccess,
}: Props) {
	const [tipoAsignacion, setTipoAsignacion] = useState<
		"TITULAR" | "PROVISIONAL"
	>(asignacion.situacionDeRevista === "Titular" ? "TITULAR" : "PROVISIONAL");

	const editarAsignacion = useEditarAsignacion({
		designacionId,
		asignacionId: asignacion.id,
		onClose,
		onSuccess,
	});

	const titularForm = useCubrirConTitularForm();
	const provisionalForm = useCubrirConProvisionalForm();

	const handleTitularSubmit = async (
		data: CubrirTitularFormValues & { empleadoId: number | null },
	) => {
		if (!data.empleadoId) return;

		await editarAsignacion.mutateAsync({
			empleadoId: data.empleadoId,
			fechaTomaPosesion: data.fechaTomaPosesion,
			fechaCese: null,
		});
	};

	const handleProvisionalSubmit = async (
		data: CubrirProvisionalFormValues & { empleadoId: number | null },
	) => {
		if (!data.empleadoId) return;

		await editarAsignacion.mutateAsync({
			empleadoId: data.empleadoId,
			fechaTomaPosesion: data.fechaTomaPosesion,
			fechaCese: data.fechaCese,
		});
	};

	return (
		<AsignacionModalBase
			title="Editar asignación"
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
