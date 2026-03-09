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

import { useAsignacionForm } from "../../form/useAsignacionForm";
import { useCubrirConTitular } from "../../hooks/useCubrirConTitular";
import { useCubrirConProvisional } from "../../hooks/useCubrirConProvisional";

import styles from "./CrrearAsignacionModal.module.scss";
import { AsignacionFormValues } from "../../form/crearAsignacion.schema";
import { CaracteristicaAsignacion } from "../../types/asignacion.types";


type Props = {
	designacionId: number;
	onClose: () => void;
	onSuccess: () => void;
};

export default function CrearAsignacionModal({
	designacionId,
	onClose,
	onSuccess,
}: Props) {

	const { form } = useAsignacionForm();

	const {
		register,
		setValue,
		unregister,
		watch,
		handleSubmit,
		formState: { errors },
	} = form;

	const tipoAsignacion = watch("tipoAsignacion");

	const cubrirTitular = useCubrirConTitular({
		designacionId,
		onClose,
		onSuccess,
	});

	const cubrirProvisional = useCubrirConProvisional({
		designacionId,
		onClose,
		onSuccess,
	});

	const isSubmitting =
		cubrirTitular.isPending || cubrirProvisional.isPending;

	// limpiar campos cuando cambia el tipo
	useEffect(() => {
		if (tipoAsignacion === "PROVISIONAL") {
			unregister("caracteristica");
		}

		if (tipoAsignacion === "TITULAR") {
			unregister("fechaCese");
		}
	}, [tipoAsignacion, unregister]);

	const onSubmit: SubmitHandler<AsignacionFormValues> = async (data) => {
		if (data.tipoAsignacion === "TITULAR") {
			await cubrirTitular.mutateAsync({
				empleadoId: Number(data.empleadoId),
				fechaTomaPosesion: data.fechaTomaPosesion,
				caracteristica:
					data.caracteristica === CaracteristicaAsignacion.NORMAL
						? undefined
						: data.caracteristica,
			});
			return;
		}

		await cubrirProvisional.mutateAsync({
			empleadoId: Number(data.empleadoId),
			fechaTomaPosesion: data.fechaTomaPosesion,
			fechaCese: data.fechaCese,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				size="large"
				title="Crear nueva asignación"
				onCancel={onClose}
				isSubmitting={isSubmitting}
			>
				<div className={styles["crear-asignacion-modal"]}>
					<div className={styles["crear-asignacion-modal__grid"]}>

						<div className={styles["crear-asignacion-modal__left"]}>
							<EmpleadoSelectorRHF<AsignacionFormValues, "empleadoId">
								name="empleadoId"
								setValue={setValue}
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

							{/* CAMPOS PARA TITULAR */}
							{tipoAsignacion === "TITULAR" && (
								<>
									<FormSelectField<AsignacionFormValues>
										label="CARACTERÍSTICA"
										name="caracteristica"
										register={register}
										error={(errors as any).caracteristica?.message}
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
								</>
							)}

							{/* CAMPOS PARA PROVISIONAL */}
							{tipoAsignacion === "PROVISIONAL" && (
								<>
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
										error={(errors as any).fechaCese?.message}
									/>
								</>
							)}

						</div>
					</div>
				</div>
			</Modal>
		</form>
	);
}