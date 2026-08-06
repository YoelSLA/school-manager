import { FormInput, FormSection } from "@/shared/components/form";
import { Modal } from "@/shared/components/Modal";
import { useCreateMateriaForm } from "../../form/hooks";
import type { MateriaCreateDTO } from "../../types";

type Props = {
  onClose: () => void;
  isSubmitting: boolean;
  onSubmit: (data: MateriaCreateDTO) => void;
};

export default function MateriaCreateModal({
  onClose,
  isSubmitting,
  onSubmit,
}: Props) {
  const { register, errors, handleFormSubmit } = useCreateMateriaForm(onSubmit);

  return (
    <Modal
      title="Crear nueva materia"
      onCancel={onClose}
      confirmLabel="Crear"
      isSubmitting={isSubmitting}
    >
      <form onSubmit={handleFormSubmit}>
        <FormSection layout="column">
          <FormInput
            label="Nombre"
            name="nombre"
            register={register}
            error={errors.nombre?.message}
          />

          <FormInput
            label="Abreviatura"
            name="abreviatura"
            register={register}
            error={errors.abreviatura?.message}
          />

          <FormInput
            label="Módulos"
            name="cantidadModulos"
            type="number"
            register={register}
            error={errors.cantidadModulos?.message}
            inputProps={{ min: 1 }}
          />
        </FormSection>
      </form>
    </Modal>
  );
}