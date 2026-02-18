import Modal from "@/components/Modal";
import type { BajaDefinitivaOutput } from "../../form/empleadoEducativo.form.types";
import { useBajaDefinitivaForm } from "../../form/hooks/useBajaDefinitivaForm";
import CausaBajaSelectField from "@/components/forms/selects/CausaBajaSelectField";


type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: BajaDefinitivaOutput) => void;
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

  const submit = (data: BajaDefinitivaOutput) => {
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
      onConfirm={handleSubmit(submit)}
      confirmLabel="Confirmar baja"
      isSubmitting={isSubmitting}
    >
      <CausaBajaSelectField<BajaDefinitivaOutput>
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
