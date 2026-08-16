import { Calendar, IdCard, User, UserRound } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput, FormSection } from "@/shared/components/Form";
import styles from "@/shared/components/Form/FormSection/FormSection.module.scss";
import type { EmpleadoEducativoCreateDTO } from "../../../types";


type Props = {
  register: UseFormRegister<EmpleadoEducativoCreateDTO>;
  errors: FieldErrors<EmpleadoEducativoCreateDTO>;
};

export default function DatosPersonalesSection({ register, errors }: Props) {
  return (
    <FormSection title="DATOS PERSONALES" layout="column">
      <FormInput
        name="cuil"
        register={register}
        error={errors.cuil?.message}
        label={
          <>
            <IdCard size={14} />
            CUIL <span className={styles.required}>*</span>
          </>
        }
      />

      <FormInput
        name="fechaDeNacimiento"
        type="date"
        register={register}
        error={errors.fechaDeNacimiento?.message}
        label={
          <>
            <Calendar size={14} />
            Fecha de nacimiento <span className={styles.required}>*</span>
          </>
        }
      />

      <FormInput
        name="nombre"
        register={register}
        error={errors.nombre?.message}
        label={
          <>
            <User size={14} />
            Nombre <span className={styles.required}>*</span>
          </>
        }
      />

      <FormInput
        name="apellido"
        register={register}
        error={errors.apellido?.message}
        label={
          <>
            <UserRound size={14} />
            Apellido <span className={styles.required}>*</span>
          </>
        }
      />
    </FormSection>
  );
}
