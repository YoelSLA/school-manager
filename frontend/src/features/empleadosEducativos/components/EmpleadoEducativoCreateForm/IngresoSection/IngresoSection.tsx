import { Calendar, CheckCircle } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import FormSection from "@/components/FormSection";
import FormInputField from "@/components/forms/FormInputField/FormInputField";
import styles from "./IngresoSection.module.scss";
import { EmpleadoEducativoCreateDTO } from "@/utils/types";

type Props = {
	register: UseFormRegister<EmpleadoEducativoCreateDTO>;
	errors: FieldErrors<EmpleadoEducativoCreateDTO>;
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
		<FormSection title="FECHA DE INGRESO" >
			{/* Check principal */}
			<label className={styles.section__checkbox}>
				<input
					type="checkbox"
					checked={agregarFecha}
					onChange={onToggleAgregarFecha}
				/>
				<span>Agregar fecha de ingreso</span>
			</label>

			{/* Bloque siempre renderizado (no salta layout) */}
			<div
				className={`
					${styles.section__fechaRow}
					${agregarFecha ? styles.section__visible : styles.section__hidden}
				`}
			>
				<div className={styles.section__inputWrapper}>
					<FormInputField
						label={
							<span className={styles.section__fechaLabel}>
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

				<label className={styles.section__checkbox}>
					<input type="checkbox" checked={usarHoy} onChange={onToggleUsarHoy} />
					<span>
						<CheckCircle size={14} />
						Usar fecha actual
					</span>
				</label>
			</div>
		</FormSection>
	);
}
