import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/Modal";
import EmpleadoAutocompleteBase from "@/features/empleadosEducativos/components/EmpleadoSelector/EmpleadoAutocompleteBase";
import type { EmpleadoEducativoMinimoDTO } from "@/features/empleadosEducativos/types/empleadosEducativos.types";
import { useCubrirDesignacionesConSuplente } from "../../hooks/useCubrirDesignacionesConSuplente";
import FechaField from "@/components/forms/inputs/FechaInputField";
import styles from "./LicenciaCubrirDesignacionesModal.module.scss";

type FormValues = {
	fechaTomaPosesion: string;
};

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
	const [search, setSearch] = useState("");
	const [suplente, setSuplente] =
		useState<EmpleadoEducativoMinimoDTO | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			fechaTomaPosesion: "",
		},
	});

	const { mutateAsync: cubrirDesignaciones, isPending } =
		useCubrirDesignacionesConSuplente();

	const handleConfirmar = handleSubmit(async (data) => {
		if (!suplente) return;

		await cubrirDesignaciones({
			licenciaId,
			body: {
				empleadoSuplenteId: suplente.id,
				designacionIds,
				fechaInicio: data.fechaTomaPosesion,
			},
		});

		onSuccess();
	});

	return (
		<Modal
			title="Cubrir designaciones"
			size="medium"
			onCancel={onClose}
			onConfirm={handleConfirmar}
			confirmLabel={isPending ? "Cubriendo…" : "Confirmar cobertura"}
			isSubmitting={isPending}
		>
			<div className={styles.body}>
				<p className={styles.description}>
					Se cubrirán <strong>{designacionIds.length}</strong> designaciones
					afectadas por esta licencia.
				</p>

				<div className={styles.fieldGroup}>
					<EmpleadoAutocompleteBase
						label="Empleado suplente"
						value={search}
						placeholder="Buscar por nombre o CUIL…"
						onChange={(v) => {
							setSearch(v);
							setSuplente(null);
						}}
						onSelect={(e) => {
							setSuplente(e);
							setSearch(`${e.apellido}, ${e.nombre}`);
						}}
					/>

					<FechaField<FormValues>
						register={register}
						name="fechaTomaPosesion"
						label="Fecha de toma de posesión"
						error={errors.fechaTomaPosesion?.message}
					/>
				</div>
			</div>
		</Modal>
	);
}