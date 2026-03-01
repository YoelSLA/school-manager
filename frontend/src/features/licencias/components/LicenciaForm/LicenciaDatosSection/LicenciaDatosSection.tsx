import { useEffect } from "react";
import TipoLicenciaSelect from "@/features/licencias/components/TipoLicenciaSelect/TipoLicenciaSelect";
import FechaField from "@/components/forms/inputs/FechaInputField";
import DescripcionField from "@/components/forms/inputs/DescripcionInputField";
import styles from "./LicenciaDatosSection.module.scss";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import type { LicenciaFormInput } from "@/features/licencias/form/licencia.form.types";
import FormSection from "@/components/FormSection";

type Props = {
  register: UseFormRegister<LicenciaFormInput>;
  watch: UseFormWatch<LicenciaFormInput>;
  setValue: UseFormSetValue<LicenciaFormInput>;
  errors: FieldErrors<LicenciaFormInput>;
};

export default function LicenciaDatosSection({
  register,
  errors,
}: Props) {
  return (
    <FormSection title="Datos de la licencia" layout="column">
      <TipoLicenciaSelect<LicenciaFormInput>
        register={register}
        name="tipoLicencia"
        error={errors.tipoLicencia?.message}
      />

      <div className={styles.dates}>
        <FechaField<LicenciaFormInput>
          register={register}
          name="fechaDesde"
          label="Desde"
          error={errors.fechaDesde?.message}
        />

        <FechaField<LicenciaFormInput>
          register={register}
          name="fechaHasta"
          label="Hasta (opcional)"
          error={errors.fechaHasta?.message}
        />
      </div>

      <DescripcionField<LicenciaFormInput>
        register={register}
        name="descripcion"
        error={errors.descripcion?.message}
      />
    </FormSection>
  );
}