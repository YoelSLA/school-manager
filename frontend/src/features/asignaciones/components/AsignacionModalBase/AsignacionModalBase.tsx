import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import FormSelectField from "@/components/forms/FormSelectField";
import Modal from "@/components/Modal/Modal";
import { EmpleadoSelector } from "@/features/empleadosEducativos/components/EmpleadoSelector";
import type { CubrirProvisionalFormValues } from "../../form/cubrirProvisional.schema";

import type { CubrirTitularFormValues } from "../../form/cubrirTitular.schema";
import FormProvisional from "../FormProvisional";
import FormTitular from "../FormTitular";

import styles from "./AsignacionModalBase.module.scss";

type Props = {
	title: string;

	tipoAsignacion: "TITULAR" | "PROVISIONAL";
	setTipoAsignacion: (tipo: "TITULAR" | "PROVISIONAL") => void;

	titularForm: UseFormReturn<CubrirTitularFormValues>;
	provisionalForm: UseFormReturn<CubrirProvisionalFormValues>;

	onTitularSubmit: (
		data: CubrirTitularFormValues & { empleadoId: number },
	) => Promise<void>;
	onProvisionalSubmit: (
		data: CubrirProvisionalFormValues & { empleadoId: number },
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

						{tipoAsignacion === "TITULAR" && <FormTitular form={titularForm} />}

						{tipoAsignacion === "PROVISIONAL" && (
							<FormProvisional form={provisionalForm} />
						)}
					</div>
				</div>
			</Modal>
		</form>
	);
}
