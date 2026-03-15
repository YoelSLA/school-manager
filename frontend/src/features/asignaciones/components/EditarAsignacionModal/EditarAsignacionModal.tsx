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

	console.log("EditarAsignacionModal → asignacion:", asignacion);

	const [tipoAsignacion, setTipoAsignacion] = useState<
		"TITULAR" | "PROVISIONAL"
	>(asignacion.situacionDeRevista === "Titular" ? "TITULAR" : "PROVISIONAL");

	console.log("EditarAsignacionModal → tipoAsignacion inicial:", tipoAsignacion);

	const editarAsignacion = useEditarAsignacion({
		designacionId,
		asignacionId: asignacion.id,
		onClose,
		onSuccess,
	});

	console.log("EditarAsignacionModal → empleadoId:", asignacion.empleado?.id);
	console.log("EditarAsignacionModal → fechaDesde:", asignacion.periodo?.fechaDesde);

	const titularForm = useCubrirConTitularForm({
		defaultValues: {
			empleadoId: asignacion.empleado.id,
			fechaTomaPosesion: asignacion.periodo.fechaDesde,
			caracteristica: CaracteristicaAsignacion.NORMAL,
		},
	});

	console.log(
		"EditarAsignacionModal → titularForm defaultValues:",
		titularForm.form.getValues(),
	);

	const provisionalForm = useCubrirConProvisionalForm();

	const handleTitularSubmit = async (
		data: EditarAsignacionDTO & { empleadoId: number | null },
	) => {
		console.log("handleTitularSubmit → data:", data);

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
		console.log("handleProvisionalSubmit → data:", data);

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