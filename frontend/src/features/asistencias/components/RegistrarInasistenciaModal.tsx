import Modal from "@/components/Modal";
import TipoLicenciaSelect from "@/features/licencias/components/TipoLicenciaSelect/TipoLicenciaSelect";
import type { RegistrarInasistenciaFormOutput } from "../form/asistencias.form.types";
import { useRegistrarInasistenciaForm } from "../form/useRegistrarInasistenciaForm";
import styles from "./RegistrarInasistenciaModal.module.scss";

type Props = {
	open: boolean;
	diasSeleccionados: number;
	isSubmitting: boolean;

	onCancel: () => void;
	onConfirm: (data: RegistrarInasistenciaFormOutput) => void;
};

export default function RegistrarInasistenciaModal({
	open,
	diasSeleccionados,
	isSubmitting,
	onCancel,
	onConfirm,
}: Props) {
	const { form } = useRegistrarInasistenciaForm();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = form;

	if (!open) return null;

	const handleCancel = () => {
		reset();
		onCancel();
	};

	return (
		<Modal
			title="Registrar inasistencia manual"
			onCancel={handleCancel}
			onConfirm={handleSubmit(onConfirm)}
			confirmLabel="Registrar"
			isSubmitting={isSubmitting}
		>
			<div className={styles.form}>
				<TipoLicenciaSelect
					register={register}
					name="tipoLicencia"
					error={errors.tipoLicencia?.message}
				/>
				<div className={styles.field}>
					<label htmlFor="observacion">Observación</label>

					<textarea
						id="observacion"
						{...register("observacion")}
						rows={3}
						placeholder="Observación opcional"
					/>
				</div>
				<p className={styles.helper}>Se registrarán {diasSeleccionados} días</p>
			</div>
		</Modal>
	);
}
