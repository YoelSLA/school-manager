import { useState } from "react";
import { EmpleadoSelector } from "@/features/empleadosEducativos/components/EmpleadoSelector";
import type {
	LicenciaFormOutput,
} from "../../form/licencia.form.types";
import { useLicenciaForm } from "../../form/hooks/useLicenciaForm";
import styles from "./LicenciaForm.module.scss";
import Button from "@/components/Button";
import LicenciaDatosSection from "./LicenciaDatosSection";

type Props = {
	onSubmit: (empleadoId: number, data: LicenciaFormOutput) => Promise<void>;
	isSubmitting: boolean;
	error?: string | null;
};

export default function LicenciaForm({ onSubmit, error, isSubmitting }: Props) {
	const {
		form: {
			register,
			handleSubmit,
			formState: { errors },
		},
	} = useLicenciaForm();

	const [empleadoId, setEmpleadoId] = useState<number | null>(null);
	const [empleadoError, setEmpleadoError] = useState<string | null>(null);

	const handleSubmitForm = async (data: LicenciaFormOutput) => {
		if (!empleadoId) {
			setEmpleadoError("Debe seleccionar un empleado");
			return;
		}

		setEmpleadoError(null);
		await onSubmit(empleadoId, data);
	};

	return (
		<form
			className={styles["licencia-form"]}
			onSubmit={handleSubmit(handleSubmitForm)}
		>
			<div className={styles["licencia-form__grid"]}>
				{/* ===== CONTENIDO ===== */}
				<div className={styles["licencia-form__content"]}>
					{/* ===== COLUMNA IZQUIERDA ===== */}
					<section className={styles["licencia-form__left"]}>
						<EmpleadoSelector
							label="Empleado"
							placeholder="Buscar por apellido o nombre"
							onSelect={(empleado) => {
								setEmpleadoId(empleado.id);
								setEmpleadoError(null);
							}}
						/>

						{empleadoError && (
							<p className={styles["licencia-form__field-error"]}>
								{empleadoError}
							</p>
						)}
					</section>

					{/* ===== COLUMNA DERECHA ===== */}
					<section className={styles["licencia-form__right"]}>
						<LicenciaDatosSection
							register={register}
							errors={errors}
						/>
					</section>
				</div>

				{/* ===== FOOTER ===== */}
				<footer className={styles["licencia-form__footer"]}>
					{error && (
						<p className={styles["licencia-form__error"]}>
							{error}
						</p>
					)}

					<Button
						type="submit"
						variant="primary"
						size="md"
						disabled={isSubmitting}
					>
						Crear licencia
					</Button>
				</footer>
			</div>
		</form>
	);
}
