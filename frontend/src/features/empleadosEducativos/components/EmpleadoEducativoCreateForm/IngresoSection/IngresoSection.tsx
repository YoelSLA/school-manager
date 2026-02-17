import { Calendar, CheckCircle } from "lucide-react";
import type {
	FieldErrors,
	UseFormRegister,
} from "react-hook-form";

import FormInputField from "@/components/forms/FormInputField/FormInputField";
import FormSection from "@/components/FormSection";
import { formSectionStyles } from "@/components/FormSection/FormSection";
import styles from "./IngresoSection.module.scss";
import type { EmpleadoEducativoCreateOutput } from "@/features/empleadosEducativos/form/empleadoEducativo.form.types";

type Props = {
	register: UseFormRegister<EmpleadoEducativoCreateOutput>;
	errors: FieldErrors<EmpleadoEducativoCreateOutput>;
	agregarFecha: boolean;
	onToggleAgregarFecha: () => void;
	usarHoy: boolean;
	onToggleUsarHoy: () => void;
};

export default function IngresoSection({
	register,
	errors,
	agregarFecha,
	onToggleAgregarFecha,
	usarHoy,
	onToggleUsarHoy,
}: Props) {
	return (
		<FormSection title="FECHA DE INGRESO">

			{/* Check principal */}
			<label className={formSectionStyles.section__checkbox}>
				<input
					type="checkbox"
					checked={agregarFecha}
					onChange={onToggleAgregarFecha}
				/>
				<span>Agregar fecha de ingreso</span>
			</label>

			{/* Bloque siempre renderizado (no salta layout) */}
			<div
				className={`${styles.fechaRow} ${agregarFecha ? styles.visible : styles.hidden
					}`}
			>
				<div className={styles.inputWrapper}>
					<FormInputField
						label={
							<span className={styles.fechaLabel}>
								<Calendar size={14} />
								Fecha
							</span>
						}
						name="fechaDeIngreso"
						type="date"
						register={register}
						error={errors.fechaDeIngreso?.message}
					/>
				</div>

				<label className={formSectionStyles.section__checkbox}>
					<input
						type="checkbox"
						checked={usarHoy}
						onChange={onToggleUsarHoy}
					/>
					<span>
						<CheckCircle size={14} />
						Usar fecha actual
					</span>
				</label>
			</div>
		</FormSection>
	);
}
