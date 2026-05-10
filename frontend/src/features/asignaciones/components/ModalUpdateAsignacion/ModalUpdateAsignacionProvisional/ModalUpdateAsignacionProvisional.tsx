import type { z } from "zod";
import FechaField from "@/components/forms/inputs/FechaInputField";
import NumberField from "@/components/forms/inputs/NumberFieldInput";
import Modal from "@/components/Modal";
import type { updateProvisionalSchema } from "@/features/asignaciones/form/updateProvisional.schema";
import { useUpdateProvisionalForm } from "@/features/asignaciones/form/useUpdateProvisionalForm";
import { useUpdateProvisional } from "@/features/asignaciones/hooks/useUpdateProvisional";
import { EmpleadoSelector } from "@/features/empleadosEducativos/components/EmpleadoSelector";
import type { EmpleadoEducativoMinimoDTO } from "@/utils/types";
import styles from "../ModalUpdateAsignacion.module.scss";

type Props = {
	designacionId: number;
	asignacionId: number;
	empleadoInicial: EmpleadoEducativoMinimoDTO | null;
	fechaDesde: string;
	fechaHasta: string | null;
	secuencia: number;
	onClose: () => void;
	onSuccess: () => void;
};

export default function ModalUpdateAsignacionProvisional({
	designacionId,
	asignacionId,
	empleadoInicial,
	fechaDesde,
	fechaHasta,
	secuencia,
	onClose,
	onSuccess,
}: Props) {
	const actualizarProvisional = useUpdateProvisional({
		designacionId,
		asignacionId,
		onClose,
		onSuccess,
	});

	if (!fechaHasta) {
		throw new Error("fechaHasta es requerida");
	}

	const provisionalForm = useUpdateProvisionalForm({
		defaultValues: {
			empleadoId: empleadoInicial?.id,
			fechaTomaPosesion: fechaDesde,
			fechaCese: fechaHasta,
			secuencia: secuencia ?? 1,
		},
	});

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = provisionalForm.form;

	const onSubmit = async (data: z.output<typeof updateProvisionalSchema>) => {
		if (!data.empleadoId) return;

		await actualizarProvisional.mutateAsync({
			empleadoId: data.empleadoId,
			fechaTomaPosesion: data.fechaTomaPosesion,
			fechaCese: data.fechaCese,
			secuencia: data.secuencia,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				title="Editar asignación provisional"
				size="medium"
				onCancel={onClose}
				confirmLabel={
					actualizarProvisional.isPending ? "Guardando…" : "Guardar cambios"
				}
				isSubmitting={actualizarProvisional.isPending}
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

							<div className={styles.field}>
								<FechaField
									register={register}
									name="fechaCese"
									label="Cese"
									error={errors.fechaCese?.message}
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
