import { Home, Mail, Phone } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import FormInputField from "@/components/forms/FormInputField/FormInputField";
import styles from "@/components/FormSection/FormSection.module.scss";
import type { EmpleadoEducativoFormOutput } from "@/features/empleadosEducativos/form/empleadoEducativo.form.types";
import FormSection from "@/components/FormSection";

type Props = {
	register: UseFormRegister<EmpleadoEducativoFormOutput>;
	errors: FieldErrors<EmpleadoEducativoFormOutput>;
};

export default function ContactoSection({ register, errors }: Props) {
	return (
		<FormSection title="CONTACTO">
			<div className={styles.section__half}>
				<FormInputField
					label={<><Phone size={14} /> Teléfono</>}
					name="telefono"
					register={register}
					error={errors.telefono?.message}
				/>
			</div>

			<div className={styles.section__half}>
				<FormInputField
					label={<><Home size={14} /> Domicilio</>}
					name="domicilio"
					register={register}
					error={errors.domicilio?.message}
				/>
			</div>

			<div className={styles.section__full}>
				<FormInputField
					label={
						<>
							<Mail size={14} />
							Email <span className={styles.required}>*</span>
						</>
					}
					name="email"
					type="email"
					register={register}
					error={errors.email?.message}
				/>
			</div>
		</FormSection>
	);
}
