import { useDesignacionAdministrativaFormUpdate } from "../../../form/hooks";
import type { DesignacionAdministrativaDetalleDTO, DesignacionAdministrativaUpdateDTO } from "../../../types";
import { DesignacionAdministrativaFormLayout } from "../../DesignacionAdministrativa";
import styles from "../../DesignacionAdministrativa/DesignacionAdministrativaForm.module.scss";
import CupoAdministrativaInputField from "../../FieldInputCupoAdministrativa";
import RolEducativoSelectField from "../../FieldSelectRolEducativo";

type Props = {
  designacion: DesignacionAdministrativaDetalleDTO;
  onSubmit: (data: DesignacionAdministrativaUpdateDTO) => Promise<void>;
  isSubmitting: boolean;
};

export default function DesignacionAdministrativaFormUpdate({
  designacion,
  onSubmit,
  isSubmitting,
}: Props) {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    franjas: { fields, append, remove },
  } = useDesignacionAdministrativaFormUpdate({
    designacion,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.header}>
        <h1 className={styles.title}>Editar designación</h1>
        <p className={styles.subtitle}>
          Modificá los datos de la designación administrativa
        </p>
      </div>

      <DesignacionAdministrativaFormLayout
        left={
          <div className={styles.left}>
          <CupoAdministrativaInputField
              register={register}
              error={errors.cupof?.message}
            />

            <RolEducativoSelectField
              register={register}
              error={errors.rolEducativo?.message}
              disabled={isSubmitting}
            />
          </div>
        }
        fields={fields}
        register={register}
        append={append}
        remove={remove}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}
