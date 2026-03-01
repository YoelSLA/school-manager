import Modal from "@/components/Modal/Modal";
import type { EditarMateriaFormValues } from "../../form/materias.form.types";
import FormInputField from "@/components/forms/FormInputField";
import FormSection from "@/components/FormSection";
import { useEditMateriaForm } from "../../form/hooks/useEditMateriaForm";
import type { MateriaEditDTO } from "../../types/materias.types";

type Props = {
  materia: MateriaEditDTO;
  onClose: () => void;
  isSubmitting: boolean;
  onSubmit: (data: EditarMateriaFormValues) => void;
};

export default function MateriaEditModal({
  materia,
  onClose,
  isSubmitting,
  onSubmit,
}: Props) {


  const { form } = useEditMateriaForm({ materia });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <Modal
      title="Editar materia"
      onCancel={onClose}
      onConfirm={handleSubmit(onSubmit)}
      confirmLabel="Guardar cambios"
      isSubmitting={isSubmitting}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection layout="column">
          <FormInputField
            label="Nombre"
            name="nombre"
            register={register}
            error={errors.nombre?.message}
          />

          <FormInputField
            label="Abreviatura"
            name="abreviatura"
            register={register}
            error={errors.abreviatura?.message}
          />

          <FormInputField
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