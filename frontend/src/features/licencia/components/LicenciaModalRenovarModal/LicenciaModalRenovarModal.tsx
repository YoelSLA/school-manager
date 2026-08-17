import { useForm } from "react-hook-form";
import { FormInput } from "@/shared/components/Form";
import { Modal } from "@/shared/components/Modal";
import { useRenovarLicencia } from "../../hooks/mutations";
import type { RenovarLicenciaDTO } from "../../types";
import TipoLicenciaSelect from "../SelectTipoLicencia";
import styles from "./LicenciaModalRenovarModal.module.scss";

type Props = {
	licenciaId: number;
	onClose: () => void;
	onSuccess: () => void;
};

export default function LicenciaModalRenovarModal({
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
			licenciaEstatutariaId: undefined,
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
		<form onSubmit={onConfirm}>
			<Modal
				size="medium"
				title="Renovar licencia"
				onCancel={onClose}
				confirmLabel="Confirmar"
				isSubmitting={isPending}
			>
				<section className={styles.body}>
					<FormInput<RenovarLicenciaDTO>
						label="Nueva fecha de finalización"
						name="nuevoHasta"
						type="date"
						register={register}
						error={errors.nuevoHasta?.message}
					/>

					<TipoLicenciaSelect
						register={register}
						name="licenciaEstatutariaId"
						error={errors.licenciaEstatutariaId?.message}
					/>

					<FormInput<RenovarLicenciaDTO>
						label="Descripción (opcional)"
						name="descripcion"
						register={register}
						error={errors.descripcion?.message}
					/>
				</section>
			</Modal>
		</form>
	);
}
