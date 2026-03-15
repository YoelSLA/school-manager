import Modal from "@/components/Modal/Modal";
import FormInputField from "@/components/forms/FormInputField/FormInputField";
import { EscuelaCreateDTO } from "@/utils/types";
import { useCrearEscuelaForm } from "../../form/useCrearEscuelaForm";
import FormSection from "@/components/FormSection";

type Props = {
  onClose: () => void;
  onSubmit: (data: EscuelaCreateDTO) => Promise<void>;
  isSubmitting: boolean;
  error?: string | null;
};

export default function CreateEscuelaModal({
  onClose,
  onSubmit,
  isSubmitting,
  error,
}: Props) {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
  } = useCrearEscuelaForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        title="Crear escuela"
        onCancel={onClose}
        confirmLabel={isSubmitting ? "Guardando..." : "Guardar"}
        isSubmitting={isSubmitting}
      >
        <FormSection layout="column">
          <FormInputField<EscuelaCreateDTO>
            label="Nombre"
            name="nombre"
            register={register}
            error={errors.nombre?.message}
          />

          <FormInputField<EscuelaCreateDTO>
            label="Localidad"
            name="localidad"
            register={register}
            error={errors.localidad?.message}
          />

          <FormInputField<EscuelaCreateDTO>
            label="Dirección"
            name="direccion"
            register={register}
            error={errors.direccion?.message}
          />

          <FormInputField<EscuelaCreateDTO>
            label="Teléfono"
            name="telefono"
            register={register}
            error={errors.telefono?.message}
          />
        </FormSection>

        {error && <p>{error}</p>}
      </Modal>
    </form>
  );
}