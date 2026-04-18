import { useState } from "react";
import { useCubrirConProvisionalForm } from "../../form/useCubrirConProvisionalForm";
import { useCubrirConTitularForm } from "../../form/useCubrirConTitularForm";
import { useEditarAsignacion } from "../../hooks/useEditarAsignacion";
import AsignacionModalBase from "../AsignacionModalBase/AsignacionModalBase";
import { AsignacionDetalleDTO, EditarAsignacionDTO } from "@/utils/types";
import { CaracteristicaAsignacion } from "@/utils/types/enums";

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

	const titularForm = useCubrirConTitularForm({
		defaultValues: {
			empleadoId: asignacion.empleado.id,
			fechaTomaPosesion: asignacion.periodo.fechaDesde,
			caracteristica: CaracteristicaAsignacion.NORMAL,
		},
	});

	const provisionalForm = useCubrirConProvisionalForm();

	const handleTitularSubmit = async (
		data: EditarAsignacionDTO & { empleadoId: number | null },
	) => {
		if (!data.empleadoId) return;

		await editarAsignacion.mutateAsync({
			empleadoId: data.empleadoId,
			fechaTomaPosesion: data.fechaTomaPosesion,
			fechaCese: null,
		});
	};

	const handleProvisionalSubmit = async (
		data: EditarAsignacionDTO & { empleadoId: number | null },
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
			defaultEmpleado={asignacion.empleado}
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