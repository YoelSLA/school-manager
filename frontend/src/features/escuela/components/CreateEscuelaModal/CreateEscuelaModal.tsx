import { FormInput, FormSection } from "@/shared/components/form";
import { Modal } from "@/shared/components/Modal";
import { useCrearEscuelaForm } from "../../form/hooks";
import type { EscuelaCreateDTO } from "../../types";

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
          <FormInput<EscuelaCreateDTO>
            label="Nombre"
            name="nombre"
            register={register}
            error={errors.nombre?.message}
          />

          <FormInput<EscuelaCreateDTO>
            label="Localidad"
            name="localidad"
            register={register}
            error={errors.localidad?.message}
          />

          <FormInput<EscuelaCreateDTO>
            label="Dirección"
            name="direccion"
            register={register}
            error={errors.direccion?.message}
          />

          <FormInput<EscuelaCreateDTO>
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
