import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { EmpleadoEducativoFormOutput } from "@/empleadosEducativos/types/empleadosEducativos.types";
import AccionesSection from "./AccionesSection";
import ContactoSection from "./ContactoSection";
import DatosPersonalesSection from "./DatosPersonalesSection";
import styles from "./EmpleadoEducativoForm.module.scss";
import IngresoSection from "./IngresoSection";

type Props = {
	register: UseFormRegister<EmpleadoEducativoFormOutput>;
	errors: FieldErrors<EmpleadoEducativoFormOutput>;
	isSubmitting: boolean;
	usarHoy: boolean;
	onToggleFecha: () => void;
	onSubmit: () => void;
};

export default function EmpleadoEducativoForm({
	register,
	errors,
	isSubmitting,
	usarHoy,
	onToggleFecha,
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
					usarHoy={usarHoy}
					onToggleUsarHoy={onToggleFecha}
				/>
			</div>

			<AccionesSection isSubmitting={isSubmitting} />
		</form>
	);
}
