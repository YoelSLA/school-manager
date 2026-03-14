import { useRef } from "react";
import Modal from "@/components/Modal/Modal";
import type { CrearCursoFormValues } from "../../form/crearCurso.schema";
import CrearCursoForm from "../CrearCursoForm/CrearCursoForm";

type Props = {
	onClose: () => void;
	isSubmitting: boolean;
	onSubmit: (data: CrearCursoFormValues) => void;
};

export default function CrearCursoModal({
	onClose,
	isSubmitting,
	onSubmit,
}: Props) {
	const submitRef = useRef<() => void>(() => {});

	return (
		<Modal
			title="Nuevo curso"
			onCancel={onClose}
			confirmLabel="Crear"
			isSubmitting={isSubmitting}
		>
			<CrearCursoForm
				onSubmit={onSubmit}
				onSubmitRef={(submit) => {
					submitRef.current = submit;
				}}
			/>
		</Modal>
	);
}
