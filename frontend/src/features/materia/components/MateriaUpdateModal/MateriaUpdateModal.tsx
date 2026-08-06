import { FormInput, FormSection } from "@/shared/components/form";
import { Modal } from "@/shared/components/Modal";
import { useUpdateMateriaForm } from "../../form/hooks";
import type { MateriaUpdateDTO } from "../../types";

type Props = {
  materia: MateriaUpdateDTO;
  onClose: () => void;
  isSubmitting: boolean;
  onSubmit: (data: MateriaUpdateDTO) => void;
};

export default function MateriaUpdateModal({
  materia,
  onClose,
  isSubmitting,
  onSubmit,
}: Props) {
  const {
    register,
    errors,
    handleFormSubmit,
  } = useUpdateMateriaForm({
    materia,
    onSubmit,
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <Modal
        title="Editar materia"
        onCancel={onClose}
        confirmLabel="Guardar cambios"
        isSubmitting={isSubmitting}
      >
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
      </Modal>
    </form>
  );
}