import { Calendar, IdCard, User, UserRound } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import FormInputField from "@/components/forms/FormInputField/FormInputField";

import styles from "@/components/FormSection/FormSection.module.scss";
import type { EmpleadoEducativoCreateInput, EmpleadoEducativoCreateOutput } from "@/features/empleadosEducativos/form/empleadoEducativo.form.types";
import FormSection from "@/components/FormSection";

type Props = {
	register: UseFormRegister<EmpleadoEducativoCreateInput>;
	errors: FieldErrors<EmpleadoEducativoCreateOutput>;
};

export default function DatosPersonalesSection({ register, errors }: Props) {
	return (
		<FormSection title="DATOS PERSONALES" layout="column">
			<FormInputField
				label={
					<>
						<IdCard size={14} />
						CUIL <span className={styles.required}>*</span>
					</>
				}
				name="cuil"
				register={register}
				error={errors.cuil?.message}
			/>

			<FormInputField
				label={
					<>
						<Calendar size={14} />
						Fecha de nacimiento <span className={styles.required}>*</span>
					</>
				}
				name="fechaDeNacimiento"
				type="date"
				register={register}
				error={errors.fechaDeNacimiento?.message}
			/>

			<FormInputField
				label={
					<>
						<User size={14} />
						Nombre <span className={styles.required}>*</span>
					</>
				}
				name="nombre"
				register={register}
				error={errors.nombre?.message}
			/>

			<FormInputField
				label={
					<>
						<UserRound size={14} />
						Apellido <span className={styles.required}>*</span>
					</>
				}
				name="apellido"
				register={register}
				error={errors.apellido?.message}
			/>
		</FormSection>
	);
}
