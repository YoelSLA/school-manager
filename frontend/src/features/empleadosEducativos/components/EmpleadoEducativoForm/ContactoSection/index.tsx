import { Home, Mail, Phone } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import FormInputField from "@/components/forms/FormInputField/FormInputField";
import type { EmpleadoEducativoFormOutput } from "@/empleadosEducativos/types/empleadosEducativos.types";

import styles from "./ContactoSection.module.scss";

type Props = {
	register: UseFormRegister<EmpleadoEducativoFormOutput>;
	errors: FieldErrors<EmpleadoEducativoFormOutput>;
};

export default function ContactoSection({ register, errors }: Props) {
	return (
		<section className={styles.section}>
			<h3 className={styles.section__title}>CONTACTO</h3>

			<div className={styles.section__divider} />

			<div className={styles.section__grid}>
				<div className={styles.section__half}>
					<FormInputField
						label={
							<>
								<Phone size={14} />
								Teléfono
							</>
						}
						name="telefono"
						register={register}
						error={errors.telefono?.message}
					/>
				</div>

				<div className={styles.section__half}>
					<FormInputField
						label={
							<>
								<Home size={14} />
								Domicilio
							</>
						}
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
								Email
							</>
						}
						name="email"
						type="email"
						register={register}
						error={errors.email?.message}
					/>
				</div>
			</div>
		</section>
	);
}
