import type { UseFormReturn } from "react-hook-form";
import FormInputField from "@/components/forms/FormInputField/FormInputField";
import FormSection from "@/components/FormSection";

import type {
  EmpleadoEducativoEditInput,
} from "../../form/empleadoEducativo.form.types";

import styles from "./EmpleadoEducativoEditForm.module.scss";

type Props = {
  form: UseFormReturn<EmpleadoEducativoEditInput>;
};

export default function EmpleadoEducativoEditForm({
  form,
}: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className={styles.form}>
      {/* ================= GRID SUPERIOR ================= */}
      <div className={styles.grid}>
        {/* DATOS PERSONALES */}
        <FormSection title="Datos personales">
          <FormInputField
            label="CUIL"
            name="cuil"
            register={register}
            inputProps={{ readOnly: true }}
          />

          <FormInputField<EmpleadoEducativoEditInput>
            label="Fecha de nacimiento *"
            name="fechaDeNacimiento"
            type="date"
            register={register}
            error={errors.fechaDeNacimiento?.message}
          />

          <FormInputField<EmpleadoEducativoEditInput>
            label="Apellido *"
            name="apellido"
            register={register}
            error={errors.apellido?.message}
          />

          <FormInputField<EmpleadoEducativoEditInput>
            label="Nombre *"
            name="nombre"
            register={register}
            error={errors.nombre?.message}
          />
        </FormSection>

        {/* CONTACTO */}
        <FormSection title="Contacto">
          <FormInputField<EmpleadoEducativoEditInput>
            label="Teléfono"
            name="telefono"
            register={register}
            error={errors.telefono?.message}
          />

          <FormInputField<EmpleadoEducativoEditInput>
            label="Domicilio"
            name="domicilio"
            register={register}
            error={errors.domicilio?.message}
          />

          <FormInputField<EmpleadoEducativoEditInput>
            label="Email *"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
          />

        </FormSection>
      </div>

      {/* ================= INFORMACIÓN LABORAL ================= */}
      <FormSection title="Información laboral">
        <FormInputField<EmpleadoEducativoEditInput>
          label="Fecha de ingreso *"
          name="fechaDeIngreso"
          type="date"
          register={register}
          error={errors.fechaDeIngreso?.message}
        />
      </FormSection>
    </div>
  );
}
