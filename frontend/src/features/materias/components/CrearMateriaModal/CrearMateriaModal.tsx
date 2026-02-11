import { useRef } from "react";
import Modal from "@/components/Modal";
import type { CrearMateriaFormOutput } from "../../form/materias.form.types";
import MateriaForm from "../MateriaForm";

type Props = {
	onClose: () => void;
	isSubmitting: boolean;
	onSubmit: (data: CrearMateriaFormOutput) => void;
};

export default function CrearMateriaModal({
	onClose,
	isSubmitting,
	onSubmit,
}: Props) {
	const submitRef = useRef<() => void>(() => {});

	return (
		<Modal
			title="Nueva materia"
			onCancel={onClose}
			onConfirm={() => submitRef.current()}
			confirmLabel="Crear"
			isSubmitting={isSubmitting}
		>
			<MateriaForm
				onSubmit={onSubmit}
				onSubmitRef={(submit) => {
					submitRef.current = submit;
				}}
			/>
		</Modal>
	);
}
