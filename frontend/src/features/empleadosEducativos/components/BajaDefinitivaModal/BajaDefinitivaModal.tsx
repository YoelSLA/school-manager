import CausaBajaSelectField from "@/components/forms/selects/CausaBajaSelectField";
import Modal from "@/components/Modal/Modal";
import { useBajaDefinitivaForm } from "../../form/hooks/useBajaDefinitivaForm";
import { BajaDefinitivaDTO } from "@/utils/types";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (data: BajaDefinitivaDTO) => void;
	isSubmitting?: boolean;
};

export default function BajaDefinitivaModal({
	isOpen,
	onClose,
	onConfirm,
	isSubmitting = false,
}: Props) {
	const { form } = useBajaDefinitivaForm();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = form;

	if (!isOpen) return null;

	const submit = (data: BajaDefinitivaDTO) => {
		onConfirm(data);
		reset();
	};

	return (
		<Modal
			title="Dar de baja definitiva"
			onCancel={() => {
				reset();
				onClose();
			}}
			confirmLabel="Confirmar baja"
			isSubmitting={isSubmitting}
		>
			<CausaBajaSelectField<BajaDefinitivaDTO>
				register={register}
				name="causa"
				error={errors.causa?.message}
			/>

			<small style={{ opacity: 0.7 }}>
				La fecha de baja se registrará automáticamente con la fecha actual.
			</small>
		</Modal>
	);
}
