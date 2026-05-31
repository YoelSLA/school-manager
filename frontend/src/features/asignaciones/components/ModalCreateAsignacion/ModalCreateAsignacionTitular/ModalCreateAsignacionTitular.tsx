import type { z } from "zod";
import Modal from "@/components/Modal";
import type { createTitularSchema } from "@/features/asignaciones/form/createTitular.schema";
import { useCreateTitularForm } from "@/features/asignaciones/form/useCreateTitularForm";
import { useCreateTitular } from "@/features/asignaciones/hooks/useCreateTitular";
import FechaField from "@/features/designaciones/components/fields/FechaInputField";
import NumberField from "@/features/designaciones/components/fields/NumberInputField";
import { EmpleadoSelector } from "@/features/empleadosEducativos/components/EmpleadoSelector";
import type { EmpleadoEducativoBasicoDTO } from "@/shared/utils/types";
import styles from "../ModalCreateAsignacion.module.scss";

type Props = {
	designacionId: number;
	secuencia: number;
	empleadoInicial: EmpleadoEducativoBasicoDTO | null;
	tomaPosesion: string;
	onClose: () => void;
	onSuccess: () => void;
};

export default function ModalCreateAsignacionTitular({
	designacionId,
	secuencia,
	empleadoInicial,
	tomaPosesion,
	onClose,
	onSuccess,
}: Props) {
	const cubrirTitular = useCreateTitular({
		designacionId,
		onClose,
		onSuccess,
	});

	const titularForm = useCreateTitularForm({
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

	const handleTitularSubmit = async (
		data: z.output<typeof createTitularSchema>,
	) => {
		if (!data.empleadoId) return;

		await cubrirTitular.mutateAsync({
			empleadoId: data.empleadoId,
			fechaTomaPosesion: data.fechaTomaPosesion,
			secuencia: data.secuencia,
			caracteristica:
				data.caracteristica === "NORMAL" ? undefined : data.caracteristica,
		});
	};

	return (
		<form onSubmit={handleSubmit(handleTitularSubmit)}>
			<Modal
				title="Crear asignación titular"
				size="medium"
				onCancel={onClose}
				confirmLabel={cubrirTitular.isPending ? "Creando…" : "Confirmar"}
				isSubmitting={cubrirTitular.isPending}
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
