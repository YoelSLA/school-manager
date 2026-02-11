import { useRef } from "react";
import Modal from "@/components/Modal";
import type { EscuelaFormOutput } from "../form/escuela.form.types";
import EscuelaForm from "./EscuelaForm/EscuelaForm";

type Props = {
	onClose: () => void;
	onSubmit: (data: EscuelaFormOutput) => Promise<void>;
	isSubmitting: boolean;
	error?: string | null;
};

export default function CrearEscuelaModal({
	onClose,
	onSubmit,
	isSubmitting,
	error,
}: Props) {
	const formRef = useRef<HTMLFormElement>(null);

	const handleConfirm = () => {
		formRef.current?.requestSubmit();
	};

	return (
		<Modal
			title="Crear escuela"
			onCancel={onClose}
			onConfirm={handleConfirm}
			confirmLabel={isSubmitting ? "Guardando..." : "Guardar"}
			isSubmitting={isSubmitting}
		>
			<EscuelaForm
				ref={formRef}
				onSubmit={onSubmit}
				isSubmitting={isSubmitting}
				error={error}
			/>
		</Modal>
	);
}
