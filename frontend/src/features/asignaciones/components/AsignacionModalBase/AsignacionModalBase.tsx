import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import FormInputField from "@/components/FormInputField/FormInputField";
import FormSelectField from "@/components/FormSelectField";
import Modal from "@/components/Modal/Modal";
import { CARACTERISTICA_ASIGNACION_OPTIONS } from "@/features/asignaciones/utils/asignaciones.utils";
import { EmpleadoSelector } from "@/features/empleadosEducativos/components/EmpleadoSelector";
import type {
	CubrirProvisionalDTO,
	CubrirTitularDTO,
	EmpleadoEducativoBasicoDTO,
} from "@/shared/utils/types";
import styles from "./AsignacionModalBase.module.scss";

type Props = {
	title: string;
	defaultEmpleado?: EmpleadoEducativoBasicoDTO | null;

	tipoAsignacion: "TITULAR" | "PROVISIONAL";
	setTipoAsignacion: (tipo: "TITULAR" | "PROVISIONAL") => void;

	titularForm: UseFormReturn<CubrirTitularDTO>;
	provisionalForm: UseFormReturn<CubrirProvisionalDTO>;

	onTitularSubmit: (
		data: CubrirTitularDTO & { empleadoId: number },
	) => Promise<void>;
	onProvisionalSubmit: (
		data: CubrirProvisionalDTO & { empleadoId: number },
	) => Promise<void>;

	onClose: () => void;
};

export default function AsignacionModalBase({
	title,
	tipoAsignacion,
	setTipoAsignacion,
	titularForm,
	provisionalForm,
	onTitularSubmit,
	onProvisionalSubmit,
	onClose,
	defaultEmpleado,
}: Props) {
	const [empleadoId, setEmpleadoId] = useState<number | null>(null);

	return (
		<form
			onSubmit={
				tipoAsignacion === "TITULAR"
					? titularForm.handleSubmit((data) => {
							if (!empleadoId) return;
							onTitularSubmit({ ...data, empleadoId });
						})
					: provisionalForm.handleSubmit((data) => {
							if (!empleadoId) return;
							onProvisionalSubmit({ ...data, empleadoId });
						})
			}
		>
			<Modal size="large" title={title} onCancel={onClose}>
				<div className={styles.grid}>
					<div className={styles.left}>
						<EmpleadoSelector
							defaultEmpleado={defaultEmpleado}
							onChange={(empleado) => {
								setEmpleadoId(empleado?.id ?? null);
							}}
						/>
					</div>

					<div className={styles.right}>
						<FormSelectField
							label="SITUACIÓN DE REVISTA"
							value={tipoAsignacion}
							onChange={(e) =>
								setTipoAsignacion(e.target.value as "TITULAR" | "PROVISIONAL")
							}
						>
							<option value="TITULAR">Titular</option>
							<option value="PROVISIONAL">Provisional</option>
						</FormSelectField>

						{/* FORM TITULAR */}
						{tipoAsignacion === "TITULAR" && (
							<>
								<FormSelectField<CubrirTitularDTO>
									label="CARACTERÍSTICA"
									name="caracteristica"
									register={titularForm.register}
									error={titularForm.formState.errors.caracteristica?.message}
								>
									{CARACTERISTICA_ASIGNACION_OPTIONS.map((opt) => (
										<option key={opt.value} value={opt.value}>
											{opt.label}
										</option>
									))}
								</FormSelectField>

								<FormInputField<CubrirTitularDTO>
									label="Fecha de toma de posesión"
									name="fechaTomaPosesion"
									type="date"
									register={titularForm.register}
									error={
										titularForm.formState.errors.fechaTomaPosesion?.message
									}
								/>
							</>
						)}

						{/* FORM PROVISIONAL */}
						{tipoAsignacion === "PROVISIONAL" && (
							<>
								<FormInputField<CubrirProvisionalDTO>
									label="Fecha de toma de posesión"
									name="fechaTomaPosesion"
									type="date"
									register={provisionalForm.register}
									error={
										provisionalForm.formState.errors.fechaTomaPosesion?.message
									}
								/>

								<FormInputField<CubrirProvisionalDTO>
									label="Fecha de cese"
									name="fechaCese"
									type="date"
									register={provisionalForm.register}
									error={provisionalForm.formState.errors.fechaCese?.message}
								/>
							</>
						)}
					</div>
				</div>
			</Modal>
		</form>
	);
}
