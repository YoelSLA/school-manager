import Modal from "@/components/Modal";
import FechaField from "@/features/designaciones/components/fields/FechaInputField";
import NumberField from "@/features/designaciones/components/fields/NumberInputField";
import { EmpleadoSelector } from "@/features/empleadosEducativos/components/EmpleadoSelector";
import type { EmpleadoEducativoMinimoDTO } from "@/shared/utils/types";
import { useCambiarCoberturaForm } from "../../hooks/useCambiarCoberturaForm";
import styles from "../LicenciaCoberturaModal.module.scss";

type Props = {
	licenciaId: number;
	designacionId: number;
	secuencia: number;
	empleadoInicial: EmpleadoEducativoMinimoDTO | null;
	fechaInicial: string;
	onClose: () => void;
	onSuccess: () => void;
};

export default function LicenciaCambiarCoberturaModal({
	licenciaId,
	designacionId,
	secuencia,
	empleadoInicial,
	fechaInicial,
	onClose,
	onSuccess,
}: Props) {
	const {
		register,
		formState: { errors },
		onSubmit,
		setEmpleado,
		isPending,
	} = useCambiarCoberturaForm({
		licenciaId,
		designacionId,
		secuencia,
		empleadoInicial,
		fechaInicial,
		onSuccess,
	});

	return (
		<form onSubmit={onSubmit}>
			<Modal
				title="Cambiar cobertura"
				size="medium"
				onCancel={onClose}
				confirmLabel={isPending ? "Cambiando cobertura…" : "Confirmar cambio"}
				isSubmitting={isPending}
			>
				<div className={styles.body}>
					<p className={styles.description}>
						Seleccione el nuevo empleado y la secuencia que tendrá en la
						cobertura.
					</p>

					<div className={styles.fieldGroup}>
						<div className={styles.selector}>
							<EmpleadoSelector
								defaultEmpleado={empleadoInicial}
								onChange={setEmpleado}
							/>
						</div>

						<div className={styles.row}>
							<div className={styles.secuencia}>
								<NumberField
									register={register}
									name="secuencia"
									label="Secuencia"
									min={1}
									error={errors.secuencia?.message}
								/>
							</div>

							<div className={styles.fecha}>
								<FechaField
									register={register}
									name="fechaTomaPosesion"
									label="Fecha de toma de posesión"
									error={errors.fechaTomaPosesion?.message}
								/>
							</div>
						</div>

						{errors.root && (
							<p className={styles.error}>{errors.root.message}</p>
						)}
					</div>
				</div>
			</Modal>
		</form>
	);
}
