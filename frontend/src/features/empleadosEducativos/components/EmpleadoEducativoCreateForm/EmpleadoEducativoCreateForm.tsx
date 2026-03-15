import type { FieldErrors, UseFormRegister } from "react-hook-form";
import FormActions from "@/components/FormActions";
import ContactoSection from "./ContactoSection/ContactoSection";
import DatosPersonalesSection from "./DatosPersonalesSection/DatosPersonalesSection";

import styles from "./EmpleadoEducativoForm.module.scss";
import IngresoSection from "./IngresoSection/IngresoSection";
import { EmpleadoEducativoCreateDTO } from "@/utils/types";

type Props = {
	register: UseFormRegister<EmpleadoEducativoCreateDTO>;
	errors: FieldErrors<EmpleadoEducativoCreateDTO>;
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
				<div className={styles.datos}>
					<DatosPersonalesSection register={register} errors={errors} />
				</div>

				<div className={styles.rightColumn}>
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

				<div className={styles.actions}>
					<FormActions
						isSubmitting={isSubmitting}
						label="Guardar"
						align="right"
					/>
				</div>
			</div>
		</form>
	);
}
