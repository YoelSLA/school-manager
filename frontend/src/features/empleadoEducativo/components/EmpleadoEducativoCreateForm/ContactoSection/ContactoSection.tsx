import { Home, Mail, Phone } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import FormInputFieldRHF from "@/shared/components/form/FormInput";
import FormSection from "@/shared/components/form/FormSection";
import styles from "@/shared/components/form/FormSection/FormSection.module.scss";
import type { EmpleadoEducativoCreateDTO } from "../../../types";


type Props = {
  register: UseFormRegister<EmpleadoEducativoCreateDTO>;
  errors: FieldErrors<EmpleadoEducativoCreateDTO>;
};

export default function ContactoSection({ register, errors }: Props) {
  return (
    <FormSection title="CONTACTO">
      <div className={styles.section__half}>
        <FormInputFieldRHF
          name="telefono"
          register={register}
          error={errors.telefono?.message}
          label={
            <>
              <Phone size={14} /> Teléfono
            </>
          }
        />
      </div>

      <div className={styles.section__half}>
        <FormInputFieldRHF
          name="domicilio"
          register={register}
          error={errors.domicilio?.message}
          label={
            <>
              <Home size={14} /> Domicilio
            </>
          }
        />
      </div>

      <div className={styles.section__full}>
        <FormInputFieldRHF
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
          label={
            <>
              <Mail size={14} />
              Email <span className={styles.required}>*</span>
            </>
          }
        />
      </div>
    </FormSection>
  );
}
