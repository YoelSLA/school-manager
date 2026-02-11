import { forwardRef } from "react";

import FormInputField from "@/components/forms/FormInputField/FormInputField";
import type {
	EscuelaFormInput,
	EscuelaFormOutput,
} from "../../form/escuela.form.types";
import { useCrearEscuelaForm } from "../../form/useCrearEscuelaForm";
import styles from "./EscuelaForm.module.scss";

type Props = {
	onSubmit: (data: EscuelaFormOutput) => Promise<void>;
	isSubmitting: boolean;
	error?: string | null;
};

const EscuelaForm = forwardRef<HTMLFormElement, Props>(
	({ onSubmit, error }, ref) => {
		const {
			form: {
				register,
				handleSubmit,
				formState: { errors },
			},
		} = useCrearEscuelaForm();

		return (
			<form
				ref={ref}
				className={styles["escuela-form"]}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={styles["escuela-form__grid"]}>
					<section className={styles["escuela-form__section"]}>
						<h3 className={styles["escuela-form__section-title"]}>
							Datos de la escuela
						</h3>

						<div className={styles["escuela-form__fields"]}>
							<FormInputField<EscuelaFormInput>
								label="Nombre"
								name="nombre"
								register={register}
								error={errors.nombre?.message}
							/>

							<FormInputField<EscuelaFormInput>
								label="Localidad"
								name="localidad"
								register={register}
								error={errors.localidad?.message}
							/>

							<FormInputField<EscuelaFormInput>
								label="Dirección"
								name="direccion"
								register={register}
								error={errors.direccion?.message}
							/>

							<FormInputField<EscuelaFormInput>
								label="Teléfono"
								name="telefono"
								register={register}
								error={errors.telefono?.message}
							/>
						</div>
					</section>
				</div>

				{error && <p className={styles["escuela-form__error"]}>{error}</p>}
			</form>
		);
	},
);

// 🔑 IMPORTANTE
EscuelaForm.displayName = "EscuelaForm";

export default EscuelaForm;
