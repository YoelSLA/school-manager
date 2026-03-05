import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import Modal from "@/components/Modal/Modal";
import FormInputField from "@/components/forms/FormInputField/FormInputField";
import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import { EmpleadoSelectorRHF } from "@/features/empleadosEducativos/components/EmpleadoSelector";
import {
	CARACTERISTICA_ASIGNACION_OPTIONS,
	TIPO_ASIGNACION_OPTIONS,
} from "@/features/asignaciones/utils/asignaciones.utils";
import { CaracteristicaAsignacion } from "../../types/asignacion.types";
import { useAsignacionForm } from "../../form/useAsignacionForm";
import { useCrearAsignacion } from "../../hooks/useCrearAsignacion";
import styles from "./CrrearAsignacionModal.module.scss";
import type { AsignacionFormValues } from "../../form/crearAsignacion.schema";

type Props = {
	designacionId: number;
	onClose: () => void;
	onSuccess: () => void;
};

export default function CrearAsignacionModal({ designacionId, onClose, onSuccess }: Props) {
	console.log("🟡 RENDER MODAL");

	const { form } = useAsignacionForm();

	const {
		register,
		setValue,
		watch,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
	} = form;

	console.log("🟡 FORM STATE:", { errors, isSubmitting, isValid });

	const tipoAsignacion = watch("tipoAsignacion");

	useEffect(() => {
		console.log("🟢 WATCH tipoAsignacion:", tipoAsignacion);
	}, [tipoAsignacion]);

	const asignacion = useCrearAsignacion({
		designacionId,
		onClose,
		onSuccess,
	});

	useEffect(() => {
		console.log("🟢 MUTATION STATE:", {
			isPending: asignacion.isSubmitting,
		});
	}, [asignacion.isSubmitting]);

	useEffect(() => {
		if (tipoAsignacion === "PROVISIONAL") {
			console.log("🔄 Limpiando característica");
			setValue("caracteristica", undefined, {
				shouldValidate: true,
			});
		}
	}, [tipoAsignacion, setValue]);

	const onSubmit: SubmitHandler<AsignacionFormValues> = async (data) => {
		console.log("🟢 onSubmit llamado con:", data);

		const payload = {
			...data,
			empleadoId: Number(data.empleadoId),
			caracteristica:
				data.caracteristica === CaracteristicaAsignacion.NORMAL
					? undefined
					: data.caracteristica,
		};

		console.log("📦 Payload final:", payload);

		try {
			await asignacion.submit(payload);
			console.log("✅ Mutation OK");
		} catch (err) {
			console.error("💥 ERROR EN MUTATION:", err);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(
				async (data) => {
					console.log("🟢 HANDLE SUBMIT OK");
					console.log("🟢 DATA:", data);

					try {
						await onSubmit(data);
						console.log("✅ onSubmit terminó OK");
					} catch (error) {
						console.error("💥 Error en onSubmit:", error);
					}
				},
				(errors) => {
					console.log("🔴 ERRORES DE VALIDACIÓN:", errors);
				}
			)}
		>
			<Modal
				size="large"
				title="Crear nueva asignación"
				onCancel={onClose}
				isSubmitting={asignacion.isSubmitting}
			>
				<div className={styles["crear-asignacion-modal"]}>
					<div className={styles["crear-asignacion-modal__grid"]}>
						<div className={styles["crear-asignacion-modal__left"]}>
							<EmpleadoSelectorRHF<AsignacionFormValues, "empleadoId">
								name="empleadoId"
								setValue={(...args) => {
									console.log("🟢 setValue empleadoId:", args);
									setValue(...args);
								}}
								clearValue={undefined}
								error={errors.empleadoId}
							/>
						</div>

						<div className={styles["crear-asignacion-modal__right"]}>
							<FormSelectField<AsignacionFormValues>
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

							<FormSelectField<AsignacionFormValues>
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

							<FormInputField<AsignacionFormValues>
								label="Fecha de toma de posesión"
								name="fechaTomaPosesion"
								type="date"
								register={register}
								error={errors.fechaTomaPosesion?.message}
							/>

							<FormInputField<AsignacionFormValues>
								label="Fecha cese"
								name="fechaCese"
								type="date"
								register={register}
								error={errors.fechaCese?.message}
							/>
						</div>
					</div>
				</div>
			</Modal>
		</form>
	);
}