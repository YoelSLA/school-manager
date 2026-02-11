import { Calendar, CheckCircle } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import FormInputField from "@/components/forms/FormInputField/FormInputField";
import type { EmpleadoEducativoFormOutput } from "@/empleadosEducativos/types/empleadosEducativos.types";

import styles from "./IngresoSection.module.scss";

type Props = {
	register: UseFormRegister<EmpleadoEducativoFormOutput>;
	errors: FieldErrors<EmpleadoEducativoFormOutput>;
	usarHoy: boolean;
	onToggleUsarHoy: () => void;
};

export default function IngresoSection({
	register,
	errors,
	usarHoy,
	onToggleUsarHoy,
}: Props) {
	return (
		<section className={styles.section}>
			<h3 className={styles.section__title}>INGRESO</h3>

			<div className={styles.section__divider} />

			<div className={styles.section__grid}>
				<label className={styles.section__checkbox}>
					<input type="checkbox" checked={usarHoy} onChange={onToggleUsarHoy} />
					<span>
						<CheckCircle size={14} />
						Fecha actual
					</span>
				</label>

				<FormInputField
					label={
						<>
							<Calendar size={14} />
							Fecha
						</>
					}
					name="fechaDeIngreso"
					type="date"
					register={register}
					error={errors.fechaDeIngreso?.message}
					inputProps={{
						readOnly: usarHoy,
					}}
				/>
			</div>
		</section>
	);
}
