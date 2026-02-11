import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import FormInputField from "@/components/forms/FormInputField/FormInputField";
import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import type {
	AsignacionFormInput,
	AsignacionFormOutput,
} from "@/features/asignaciones/form/asignacion.form.types";
import {
	CARACTERISTICA_ASIGNACION_OPTIONS,
	TIPO_ASIGNACION_OPTIONS,
} from "@/features/asignaciones/utils/asignaciones.utils";
import { EmpleadoSelectorRHF } from "@/features/empleadosEducativos/components/EmpleadoSelector";
import styles from "./AsignacionForm.module.scss";

type Props = {
	form: UseFormReturn<AsignacionFormInput, unknown, AsignacionFormOutput>;
};

export default function AsignacionForm({ form }: Props) {
	const {
		register,
		setValue,
		watch,
		formState: { errors },
	} = form;

	const tipoAsignacion = watch("tipoAsignacion");

	useEffect(() => {
		if (tipoAsignacion === "PROVISIONAL") {
			setValue("caracteristica", undefined, {
				shouldValidate: true,
			});
		}
	}, [tipoAsignacion, setValue]);

	return (
		<div className={styles["asignacion-form"]}>
			<div className={styles["asignacion-form__grid"]}>
				<div className={styles["asignacion-form__left"]}>
					<EmpleadoSelectorRHF<AsignacionFormInput, "empleadoId">
						name="empleadoId"
						setValue={setValue}
						clearValue={null}
						error={errors.empleadoId}
					/>
				</div>

				<div className={styles["asignacion-form__right"]}>
					<FormSelectField<AsignacionFormInput>
						label="TIPO"
						name="tipoAsignacion"
						register={register}
						error={errors.tipoAsignacion?.message}
					>
						{TIPO_ASIGNACION_OPTIONS.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</FormSelectField>

					<div className={styles["asignacion-form__caracteristica"]}>
						<FormSelectField<AsignacionFormInput>
							label="CARACTERÍSTICA"
							name="caracteristica"
							register={register}
							disabled={tipoAsignacion !== "TITULAR"}
							error={errors.caracteristica?.message}
						>
							{CARACTERISTICA_ASIGNACION_OPTIONS.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</FormSelectField>
					</div>


					<FormInputField<AsignacionFormInput>
						label="Fecha de toma de posesión"
						name="fechaTomaPosesion"
						type="date"
						register={register}
						error={errors.fechaTomaPosesion?.message}
					/>
				</div>
			</div>
		</div>
	);
}
