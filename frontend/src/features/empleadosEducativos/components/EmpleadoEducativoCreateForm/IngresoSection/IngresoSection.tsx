import { Calendar, CheckCircle } from "lucide-react";
import {
	Controller,
	type Control,
	type FieldErrors,
	type UseFormRegister,
} from "react-hook-form";
import { useId } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import FormSection from "@/components/FormSection";
import { formSectionStyles } from "@/components/FormSection/FormSection";
import styles from "./IngresoSection.module.scss";

import type { EmpleadoEducativoCreateOutput } from "@/features/empleadosEducativos/form/empleadoEducativo.form.types";

type Props = {
	control: Control<EmpleadoEducativoCreateOutput>;
	register: UseFormRegister<EmpleadoEducativoCreateOutput>;
	errors: FieldErrors<EmpleadoEducativoCreateOutput>;
	agregarFecha: boolean;
	onToggleAgregarFecha: () => void;
	usarHoy: boolean;
	onToggleUsarHoy: () => void;
};

export default function IngresoSection({
	control,
	register,
	errors,
	agregarFecha,
	onToggleAgregarFecha,
	usarHoy,
	onToggleUsarHoy,
}: Props) {
	const dateInputId = useId();

	return (
		<FormSection title="FECHA DE INGRESO">
			{/* Checkbox principal */}
			<label className={formSectionStyles.section__checkbox}>
				<input
					type="checkbox"
					checked={agregarFecha}
					onChange={onToggleAgregarFecha}
				/>
				<span>Agregar fecha de ingreso</span>
			</label>

			{/* Bloque siempre renderizado */}
			<div
				className={`${styles.fechaRow} ${agregarFecha ? styles.visible : styles.hidden
					}`}
			>
				{/* DatePicker controlado */}
				<div className={styles.inputWrapper}>
					<Controller
						control={control}
						name="fechaDeIngreso"
						render={({ field }) => (
							<div className={styles.datePickerWrapper}>
								<label
									htmlFor={dateInputId}
									className={styles.fechaLabel}
								>
									<Calendar size={14} />
									Fecha
								</label>

								<DatePicker
									id={dateInputId}
									selected={field.value ? new Date(field.value) : null}
									onChange={(date: Date | null) =>
										field.onChange(date)
									}
									dateFormat="dd/MM/yyyy"
									placeholderText="Seleccionar fecha"
									className={`${styles.dateInput} ${errors.fechaDeIngreso ? styles.error : ""
										}`}
									popperPlacement="bottom-start"
									disabled={!agregarFecha}
								/>
							</div>
						)}
					/>

					{errors.fechaDeIngreso && (
						<span className={styles.errorText}>
							{errors.fechaDeIngreso.message}
						</span>
					)}
				</div>

				{/* Checkbox usar hoy */}
				<label className={formSectionStyles.section__checkbox}>
					<input
						type="checkbox"
						checked={usarHoy}
						onChange={onToggleUsarHoy}
						disabled={!agregarFecha}
					/>
					<span className={styles.usarHoy}>
						<CheckCircle size={14} />
						Usar fecha actual
					</span>
				</label>
			</div>
		</FormSection>
	);
}
