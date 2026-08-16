import { FormInput, FormSection } from "@/shared/components/Form";
import { Modal } from "@/shared/components/Modal";
import { useCrearLicenciaEstatutariaForm } from "../../form/hooks";
import type {
  LicenciaEstatutariaCreateDTO,
  LicenciaEstatutariaCreateFormValues,
} from "../../types";

type Props = {
  onClose: () => void;
  isSubmitting: boolean;
  onSubmit: (data: LicenciaEstatutariaCreateDTO) => void;
};

export default function LicenciaEstatutariaModalCreate({
  onClose,
  isSubmitting,
  onSubmit,
}: Props) {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
  } = useCrearLicenciaEstatutariaForm();

  const handleFormSubmit = (
    data: LicenciaEstatutariaCreateFormValues,
  ) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Modal
        title="Nueva licencia estatutaria"
        onCancel={onClose}
        isSubmitting={isSubmitting}
      >
        <FormSection title="Datos de la licencia">
          <FormInput<LicenciaEstatutariaCreateFormValues>
            label="Artículo"
            name="articulo"
            register={register}
            error={errors.articulo?.message}
          />

          <FormInput<LicenciaEstatutariaCreateFormValues>
            label="Código"
            name="codigo"
            register={register}
            error={errors.codigo?.message}
          />

          <FormInput<LicenciaEstatutariaCreateFormValues>
            label="Nombre"
            name="nombre"
            register={register}
            error={errors.nombre?.message}
          />

          <FormInput<LicenciaEstatutariaCreateFormValues>
            label="Descripción"
            name="descripcion"
            register={register}
            error={errors.descripcion?.message}
          />
        </FormSection>
      </Modal>
    </form>
  );
}