import { useRef } from "react";
import Modal from "@/components/Modal";
import type { CrearCursoFormOutput } from "../../form/curso.form.types";
import CrearCursoForm from "../CrearCursoForm/CrearCursoForm";

type Props = {
  onClose: () => void;
  isSubmitting: boolean;
  onSubmit: (data: CrearCursoFormOutput) => void;
};

export default function CrearCursoModal({
  onClose,
  isSubmitting,
  onSubmit,
}: Props) {
  const submitRef = useRef<() => void>(() => { });

  return (
    <Modal
      title="Nuevo curso"
      onCancel={onClose}
      onConfirm={() => submitRef.current()}
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
