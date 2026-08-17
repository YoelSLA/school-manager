import { SelectTipoLicencia } from "@/features/licencia/components";
import { Modal } from "@/shared/components/Modal";
import { useCreateaAsistenciaForm } from "../../form/hooks";
import type { AsistenciaCreateDTO } from "../../types";
import styles from "./AsistenciaModalCreate.module.scss";

type Props = {
	open: boolean;

	diasSeleccionados: number;

	fechasSeleccionadas: Date[];

	isSubmitting: boolean;

	onCancel: () => void;

	onConfirm: (data: AsistenciaCreateDTO) => void;
};

/* =========================================================
 * HELPERS
 * =======================================================*/

function formatFecha(date: Date) {
	return date.toLocaleDateString("es-AR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

/* =========================================================
 * COMPONENT
 * =======================================================*/

export default function AsistenciaModalCreate({
	open,
	diasSeleccionados,
	fechasSeleccionadas,
	isSubmitting,
	onCancel,
	onConfirm,
}: Props) {
	const { form } = useCreateaAsistenciaForm();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = form;

	/* =========================================================
	 * TITLE
	 * =======================================================*/

	const titulo =
		fechasSeleccionadas.length === 1
			? `Registrar inasistencia · ${formatFecha(fechasSeleccionadas[0])}`
			: `Registrar inasistencia · ${diasSeleccionados} días`;

	/* =========================================================
	 * GUARDS
	 * =======================================================*/

	if (!open) {
		return null;
	}

	/* =========================================================
	 * HANDLERS
	 * =======================================================*/

	const handleCancel = () => {
		reset();

		onCancel();
	};

	/* =========================================================
	 * RENDER
	 * =======================================================*/

	return (
		<form onSubmit={handleSubmit(onConfirm)}>
			<Modal
				title={titulo}
				onCancel={handleCancel}
				confirmLabel="Registrar"
				isSubmitting={isSubmitting}
			>
				<div className={styles.form}>
					<SelectTipoLicencia
						register={register}
						name="licenciaEstatutariaId"
						error={errors.licenciaEstatutariaId?.message}
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

					<p className={styles.helper}>
						Se registrarán {diasSeleccionados} días
					</p>
				</div>
			</Modal>
		</form>
	);
}
