import type { UseFormReturn } from "react-hook-form";
import { FormInput, FormSection } from "@/shared/components/Form";
import type { EmpleadoEducativoUpdateDTO } from "../../types";
import styles from "./EmpleadoEducativoFormUpdate.module.scss";

type Props = {
	form: UseFormReturn<EmpleadoEducativoUpdateDTO>;
};

export default function EmpleadoEducativoUpdateForm({ form }: Props) {
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
					<FormInput
						label="CUIL"
						name="cuil"
						register={register}
						inputProps={{ readOnly: true }}
					/>

					<FormInput<EmpleadoEducativoUpdateDTO>
						label="Fecha de nacimiento *"
						name="fechaDeNacimiento"
						type="date"
						register={register}
						error={errors.fechaDeNacimiento?.message}
					/>

					<FormInput<EmpleadoEducativoUpdateDTO>
						label="Apellido *"
						name="apellido"
						register={register}
						error={errors.apellido?.message}
					/>

					<FormInput<EmpleadoEducativoUpdateDTO>
						label="Nombre *"
						name="nombre"
						register={register}
						error={errors.nombre?.message}
					/>
				</FormSection>

				{/* CONTACTO */}
				<FormSection title="Contacto">
					<FormInput<EmpleadoEducativoUpdateDTO>
						label="Teléfono"
						name="telefono"
						register={register}
						error={errors.telefono?.message}
					/>

					<FormInput<EmpleadoEducativoUpdateDTO>
						label="Domicilio"
						name="domicilio"
						register={register}
						error={errors.domicilio?.message}
					/>

					<FormInput<EmpleadoEducativoUpdateDTO>
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
				<FormInput<EmpleadoEducativoUpdateDTO>
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
