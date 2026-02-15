import type { FieldErrors, UseFormRegister } from "react-hook-form";

import ContactoSection from "./ContactoSection/ContactoSection";
import DatosPersonalesSection from "./DatosPersonalesSection/DatosPersonalesSection";
import IngresoSection from "./IngresoSection/IngresoSection";

import FormActions from "@/components/FormActions"; // 👈 nuevo

import styles from "./EmpleadoEducativoForm.module.scss";
import type { EmpleadoEducativoCreateOutput } from "../../form/empleadoEducativo.form.types";


type Props = {
	register: UseFormRegister<EmpleadoEducativoCreateOutput>;
	errors: FieldErrors<EmpleadoEducativoCreateOutput>;
	isSubmitting: boolean;

	agregarFecha: boolean;
	onToggleAgregarFecha: () => void;

	usarHoy: boolean;
	onToggleUsarHoy: () => void;

	onSubmit: () => void;
};

export default function EmpleadoEducativoCreateForm({
	register,
	errors,
	isSubmitting,
	agregarFecha,
	onToggleAgregarFecha,
	usarHoy,
	onToggleUsarHoy,
	onSubmit,
}: Props) {
	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<div className={styles.grid}>
				<DatosPersonalesSection register={register} errors={errors} />

				<ContactoSection register={register} errors={errors} />

				<IngresoSection
					register={register}
					errors={errors}
					agregarFecha={agregarFecha}
					onToggleAgregarFecha={onToggleAgregarFecha}
					usarHoy={usarHoy}
					onToggleUsarHoy={onToggleUsarHoy}
				/>
			</div>

			{/* 🔥 Nuevo botón genérico */}
			<FormActions
				isSubmitting={isSubmitting}
				label="Guardar"
				align="right"
			/>
		</form>
	);
}
