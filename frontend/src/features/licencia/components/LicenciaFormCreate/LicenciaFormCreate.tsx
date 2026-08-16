import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/shared/components";
import { FormInputDate, FormInputDescripcion, FormSection } from "@/shared/components/Form";
import type { LicenciaCreateFormInput, } from "../../types";
import SelectTipoLicencia from "../SelectTipoLicencia";
import styles from "./LicenciaFormCreate.module.scss";

type Props = {
  form: UseFormReturn<LicenciaCreateFormInput>;
  isSubmitting: boolean;
};

export default function LicenciaFormCreate({
  form,
  isSubmitting,
}: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className={styles.licenciaForm}>
      <FormSection
        title="Datos de la licencia"
        grow
        actions={
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting}
          >
            Crear licencia
          </Button>
        }
      >
        <div className={styles.grid}>
          <div className={styles.tipo}>
            <SelectTipoLicencia
              register={register}
              name="licenciaEstatutariaId"
              error={errors.licenciaEstatutariaId?.message}
            />
          </div>

          <div className={styles.fechaDesde}>
            <FormInputDate
              register={register}
              name="periodo.fechaDesde"
              label="FECHA DESDE"
              error={errors.periodo?.fechaDesde?.message}
            />
          </div>

          <div className={styles.fechaHasta}>
            <FormInputDate
              register={register}
              name="periodo.fechaHasta"
              label="FECHA HASTA"
              error={errors.periodo?.fechaHasta?.message}
            />
          </div>

          <div className={styles.descripcion}>
            <FormInputDescripcion
              register={register}
              name="descripcion"
              error={errors.descripcion?.message}
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
}
