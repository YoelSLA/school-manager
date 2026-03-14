import FechaField from "@/components/forms/inputs/FechaInputField";
import Modal from "@/components/Modal";
import { EmpleadoSelector } from "@/features/empleadosEducativos/components/EmpleadoSelector";
import { useCubrirDesignacionesForm } from "../../hooks/useCubrirDesignacionesConSuplenteForm";
import styles from "./LicenciaCubrirDesignacionesModal.module.scss";

type Props = {
	licenciaId: number;
	designacionIds: number[];
	onClose: () => void;
	onSuccess: () => void;
};

export default function LicenciaCubrirDesignacionesModal({
	licenciaId,
	designacionIds,
	onClose,
	onSuccess,
}: Props) {
	const {
		register,
		formState: { errors },
		onSubmit,
		setSuplente,
		isPending,
	} = useCubrirDesignacionesForm({
		licenciaId,
		designacionIds,
		onSuccess,
	});

	return (
		<form onSubmit={onSubmit}>
			<Modal
				title="Cubrir designaciones"
				size="medium"
				onCancel={onClose}
				confirmLabel={isPending ? "Cubriendo…" : "Confirmar cobertura"}
				isSubmitting={isPending}
			>
				<div className={styles.body}>
					<p className={styles.description}>
						Se cubrirán <strong>{designacionIds.length}</strong> designaciones
						afectadas por esta licencia.
					</p>

					<div className={styles.fieldGroup}>
						<div className={styles.selector}>
							<EmpleadoSelector
								onChange={(empleado) => setSuplente(empleado)}
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
				</div>
			</Modal>
		</form>
	);
}
