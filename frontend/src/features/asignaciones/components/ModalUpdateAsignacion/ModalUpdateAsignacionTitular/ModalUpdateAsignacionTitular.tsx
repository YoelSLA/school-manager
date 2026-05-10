import type { z } from "zod";
import FechaField from "@/components/forms/inputs/FechaInputField";
import NumberField from "@/components/forms/inputs/NumberFieldInput";
import Modal from "@/components/Modal";
import type { updateTitularSchema } from "@/features/asignaciones/form/updateTitular.schema";
import { useUpdateTitularForm } from "@/features/asignaciones/form/useUpdateTitularForm";
import { useUpdateTitular } from "@/features/asignaciones/hooks/useUpdateTitular";
import { EmpleadoSelector } from "@/features/empleadosEducativos/components/EmpleadoSelector";
import type { EmpleadoEducativoMinimoDTO } from "@/utils/types";
import styles from "../ModalUpdateAsignacion.module.scss";

type Props = {
	designacionId: number;
	asignacionId: number;
	secuencia: number;
	empleadoInicial: EmpleadoEducativoMinimoDTO | null;
	tomaPosesion: string;
	onClose: () => void;
	onSuccess: () => void;
};

export default function ModalUpdateAsignacionTitular({
	designacionId,
	asignacionId,
	secuencia,
	empleadoInicial,
	tomaPosesion,
	onClose,
	onSuccess,
}: Props) {
	const actualizarTitular = useUpdateTitular({
		designacionId,
		asignacionId,
		onClose,
		onSuccess,
	});

	const titularForm = useUpdateTitularForm({
		defaultValues: {
			empleadoId: empleadoInicial?.id,
			fechaTomaPosesion: tomaPosesion,
			secuencia: secuencia ?? 1,
		},
	});

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = titularForm.form;

	const onSubmit = async (data: z.output<typeof updateTitularSchema>) => {
		if (!data.empleadoId) return;

		await actualizarTitular.mutateAsync({
			empleadoId: data.empleadoId,
			fechaTomaPosesion: data.fechaTomaPosesion,
			secuencia: data.secuencia,
			caracteristica:
				data.caracteristica === "NORMAL" ? undefined : data.caracteristica,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				title="Editar asignación titular"
				size="medium"
				onCancel={onClose}
				confirmLabel={
					actualizarTitular.isPending ? "Guardando…" : "Guardar cambios"
				}
				isSubmitting={actualizarTitular.isPending}
			>
				<div className={styles.body}>
					{/* EMPLEADO */}
					<div className={`${styles.sectionCard} ${styles.sectionEmpleado}`}>
						<EmpleadoSelector
							defaultEmpleado={empleadoInicial}
							onChange={(empleado) => setValue("empleadoId", empleado?.id)}
						/>
					</div>

					{/* DATOS */}
					<div className={`${styles.sectionCard} ${styles.sectionDatos}`}>
						<div className={styles.row}>
							<div className={styles.field}>
								<NumberField
									register={register}
									name="secuencia"
									label="Secuencia"
									min={1}
									error={errors.secuencia?.message}
								/>
							</div>

							<div className={styles.field}>
								<FechaField
									register={register}
									name="fechaTomaPosesion"
									label="Toma de posesión"
									error={errors.fechaTomaPosesion?.message}
								/>
							</div>
						</div>
					</div>

					{errors.root && <p className={styles.error}>{errors.root.message}</p>}
				</div>
			</Modal>
		</form>
	);
}
