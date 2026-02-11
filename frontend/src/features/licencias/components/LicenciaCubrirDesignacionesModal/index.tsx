import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/Modal";
import EmpleadoAutocompleteBase from "@/features/empleadosEducativos/components/EmpleadoSelector/EmpleadoAutocompleteBase";

import "./LicenciaCubrirDesignacionesModal.css";
import FormInputField from "@/components/forms/FormInputField/FormInputField";
import type { EmpleadoEducativoMinimoDTO } from "@/features/empleadosEducativos/types/empleadosEducativos.types";
import { useCubrirDesignacionesConSuplente } from "../../hooks/useCubrirDesignacionesConSuplente";

type FormValues = {
	fechaTomaPosesion: string;
};

type Props = {
	licenciaId: number;
	designacionIds: number[];
	onClose: () => void;
	onSuccess: () => void;
};

export function LicenciaCubrirDesignacionesModal({
	licenciaId,
	designacionIds,
	onClose,
	onSuccess,
}: Props) {
	const [search, setSearch] = useState("");
	const [suplente, setSuplente] = useState<EmpleadoEducativoMinimoDTO | null>(
		null,
	);

	const {
		register,
		setValue,
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
		<Modal size="medium">
			<div className="licencia-cubrir-designaciones-modal">
				{/* HEADER */}
				<header className="licencia-cubrir-designaciones-modal__header">
					<h3 className="licencia-cubrir-designaciones-modal__title">
						Cubrir designaciones
					</h3>

					<button
						type="button"
						className="licencia-cubrir-designaciones-modal__close"
						onClick={onClose}
					>
						✕
					</button>
				</header>

				{/* BODY */}
				<section className="licencia-cubrir-designaciones-modal__body">
					<p className="licencia-cubrir-designaciones-modal__hint">
						Se cubrirán <strong>{designacionIds.length}</strong> designaciones
						afectadas por esta licencia.
					</p>

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

					{/* FECHA TOMA DE POSESIÓN */}
					<FormInputField<FormValues>
						label="Fecha de toma de posesión"
						name="fechaTomaPosesion"
						type="date"
						register={register}
						error={errors.fechaTomaPosesion?.message}
						rightAddon={
							<button
								type="button"
								className="btn-today"
								onClick={() =>
									setValue(
										"fechaTomaPosesion",
										new Date().toISOString().slice(0, 10),
										{ shouldValidate: true },
									)
								}
							>
								FECHA ACTUAL
							</button>
						}
					/>
				</section>

				{/* FOOTER */}
				<footer className="licencia-cubrir-designaciones-modal__footer">
					<button type="button" className="btn-secondary" onClick={onClose}>
						Cancelar
					</button>

					<button
						type="button"
						className="btn-primary"
						disabled={!suplente || isPending}
						onClick={handleConfirmar}
					>
						{isPending ? "Cubriendo…" : "Confirmar cobertura"}
					</button>
				</footer>
			</div>
		</Modal>
	);
}
