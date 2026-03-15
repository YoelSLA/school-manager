import type { UseFormReturn } from "react-hook-form";
import FormSection from "@/components/FormSection";
import FormInputField from "@/components/forms/FormInputField/FormInputField";

import styles from "./EmpleadoEducativoEditForm.module.scss";
import { EmpleadoEducativoUpdateDTO } from "@/utils/types";

type Props = {
	form: UseFormReturn<EmpleadoEducativoUpdateDTO>;
};

export default function EmpleadoEducativoEditForm({ form }: Props) {
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

					<FormInputField<EmpleadoEducativoUpdateDTO>
						label="Fecha de nacimiento *"
						name="fechaDeNacimiento"
						type="date"
						register={register}
						error={errors.fechaDeNacimiento?.message}
					/>

					<FormInputField<EmpleadoEducativoUpdateDTO>
						label="Apellido *"
						name="apellido"
						register={register}
						error={errors.apellido?.message}
					/>

					<FormInputField<EmpleadoEducativoUpdateDTO>
						label="Nombre *"
						name="nombre"
						register={register}
						error={errors.nombre?.message}
					/>
				</FormSection>

				{/* CONTACTO */}
				<FormSection title="Contacto">
					<FormInputField<EmpleadoEducativoUpdateDTO>
						label="Teléfono"
						name="telefono"
						register={register}
						error={errors.telefono?.message}
					/>

					<FormInputField<EmpleadoEducativoUpdateDTO>
						label="Domicilio"
						name="domicilio"
						register={register}
						error={errors.domicilio?.message}
					/>

					<FormInputField<EmpleadoEducativoUpdateDTO>
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
				<FormInputField<EmpleadoEducativoUpdateDTO>
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
