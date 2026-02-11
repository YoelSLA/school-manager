import type { SubmitHandler } from "react-hook-form";
import Modal from "@/components/Modal";
import type { AsignacionFormOutput } from "../../form/asignacion.form.types";
import { useAsignacionForm } from "../../form/hooks/useAsignacionForm";
import { useCrearAsignacion } from "../../hooks/useCrearAsignacion";
import AsignacionForm from "../AsignacionForm/AsignacionForm";
import { CaracteristicaAsignacion } from "../../types/asignacion.types";

type Props = {
	designacionId: number;
	onClose: () => void;
	onSuccess: () => void;
};

export default function CrearAsignacionModal(props: Props) {
	const { form } = useAsignacionForm();

	const asignacion = useCrearAsignacion({
		designacionId: props.designacionId,
		onClose: props.onClose,
		onSuccess: props.onSuccess,
	});

	const onSubmit: SubmitHandler<AsignacionFormOutput> = async (data) => {
		const payload = {
			...data,
			caracteristica:
				data.caracteristica === CaracteristicaAsignacion.NORMAL
					? undefined
					: data.caracteristica,
		};

		await asignacion.submit(payload);
	};

	return (
		<Modal
			size="large"
			title="Crear nueva asignación"
			onCancel={props.onClose}
			onConfirm={form.handleSubmit(onSubmit)}
			isSubmitting={asignacion.isSubmitting}
		>
			<form>
				<AsignacionForm form={form} />
			</form>
		</Modal>
	);
}
