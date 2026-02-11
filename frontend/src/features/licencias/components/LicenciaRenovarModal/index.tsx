import { useForm } from "react-hook-form";
import FormInputField from "@/components/forms/FormInputField/FormInputField";
import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import Modal from "@/components/Modal";
import "./LicenciaRenovarModal.css";
import { agruparPorArticulo } from "@/utils";
import { useRenovarLicencia } from "../../hooks/useRenovarLicencia";
import type { RenovarLicenciaDTO } from "../../types/licencia.types";
import { TIPOS_LICENCIA } from "../../utils/tipoLicencia";

type Props = {
	licenciaId: number;
	onClose: () => void;
	onSuccess: () => void;
};

export default function LicenciaRenovarModal({
	licenciaId,
	onClose,
	onSuccess,
}: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RenovarLicenciaDTO>({
		defaultValues: {
			nuevoHasta: "",
			tipoLicencia: "",
			descripcion: "",
		},
	});

	const { mutateAsync: renovarLicencia, isPending } = useRenovarLicencia();

	const onConfirm = handleSubmit(async (data) => {
		await renovarLicencia({
			licenciaId,
			body: data,
		});
		onSuccess();
	});

	return (
		<Modal
			size="medium"
			title="Renovar licencia"
			onCancel={onClose}
			onConfirm={onConfirm}
			confirmLabel="Confirmar"
			isSubmitting={isPending}
		>
			<section className="licencia-renovar-modal__body">
				<FormInputField<RenovarLicenciaDTO>
					label="Nueva fecha de finalización"
					name="nuevoHasta"
					type="date"
					register={register}
					error={errors.nuevoHasta?.message}
				/>

				<FormSelectField<RenovarLicenciaDTO>
					label="Tipo de licencia"
					name="tipoLicencia"
					register={register}
					error={errors.tipoLicencia?.message}
				>
					{Object.values(agruparPorArticulo(TIPOS_LICENCIA))
						.flat()
						.map((t) => (
							<option key={t.enumValue} value={t.enumValue}>
								{t.codigo} — {t.descripcion}
							</option>
						))}
				</FormSelectField>

				<FormInputField<RenovarLicenciaDTO>
					label="Descripción (opcional)"
					name="descripcion"
					register={register}
					error={errors.descripcion?.message}
				/>
			</section>
		</Modal>
	);
}
