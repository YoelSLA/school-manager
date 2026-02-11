import { Calendar, IdCard, User, UserRound } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import FormInputField from "@/components/forms/FormInputField/FormInputField";
import type { EmpleadoEducativoFormOutput } from "@/empleadosEducativos/types/empleadosEducativos.types";

import styles from "./DatosPersonalesSection.module.scss";

type Props = {
	register: UseFormRegister<EmpleadoEducativoFormOutput>;
	errors: FieldErrors<EmpleadoEducativoFormOutput>;
};

export default function DatosPersonalesSection({ register, errors }: Props) {
	return (
		<section className={styles.section}>
			<h3 className={styles.section__title}>DATOS PERSONALES</h3>
			<div className={styles.section__divider} />
			<div className={styles.section__grid}>
				<FormInputField
					label={
						<>
							<IdCard size={14} />
							CUIL
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
							Fecha de nacimiento
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
							Nombre
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
							Apellido
						</>
					}
					name="apellido"
					register={register}
					error={errors.apellido?.message}
				/>
			</div>
		</section>
	);
}
