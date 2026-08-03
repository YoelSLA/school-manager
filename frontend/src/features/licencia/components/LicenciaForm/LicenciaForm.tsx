import type { UseFormReturn } from "react-hook-form";
import { FieldInputDescripcion, FieldInputFecha } from "@/features/designacion/components"
import Button from "@/shared/components/Button";
import FormSection from "@/shared/components/form/FormSection";
import type { LicenciaCreateFormValues } from "../../types";
import TipoLicenciaSelect from "../TipoLicenciaSelect";
import styles from "./LicenciaForm.module.scss";

type Props = {
  form: UseFormReturn<LicenciaCreateFormValues>;
  isSubmitting: boolean;
};

export default function LicenciaForm({
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
            <TipoLicenciaSelect
              register={register}
              name="tipoLicencia"
              error={errors.tipoLicencia?.message}
            />
          </div>

          <div className={styles.fechaDesde}>
            <FieldInputFecha
              register={register}
              name="periodo.fechaDesde"
              label="FECHA DESDE"
              error={errors.periodo?.fechaDesde?.message}
            />
          </div>

          <div className={styles.fechaHasta}>
            <FieldInputFecha
              register={register}
              name="periodo.fechaHasta"
              label="FECHA HASTA"
              error={errors.periodo?.fechaHasta?.message}
            />
          </div>

          <div className={styles.descripcion}>
            <FieldInputDescripcion
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