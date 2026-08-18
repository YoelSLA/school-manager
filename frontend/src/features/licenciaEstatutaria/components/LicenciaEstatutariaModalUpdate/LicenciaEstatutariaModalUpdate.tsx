import { FormInput, FormSection } from "@/shared/components/Form";
import { Modal } from "@/shared/components/Modal";
import { useEditarLicenciaEstatutariaForm } from "../../form/hooks";
import type {
	LicenciaEstatutariaResponseDTO,
	LicenciaEstatutariaUpdateDTO,
	LicenciaEstatutariaUpdateFormValues,
} from "../../types";

type Props = {
	licencia: LicenciaEstatutariaResponseDTO;
	onClose: () => void;
	isSubmitting: boolean;
	onSubmit: (data: LicenciaEstatutariaUpdateDTO) => void;
};

export default function LicenciaEstatutariaUpdateModal({
	licencia,
	onClose,
	isSubmitting,
	onSubmit,
}: Props) {
	const {
		form: {
			register,
			handleSubmit,
			formState: { errors },
		},
	} = useEditarLicenciaEstatutariaForm({
		articulo: licencia.articulo,
		codigo: licencia.codigo,
		nombre: licencia.nombre,
		descripcion: licencia.descripcion,
	});

	const handleFormSubmit = (data: LicenciaEstatutariaUpdateFormValues) => {
		onSubmit(data);
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Modal
				title="Editar licencia estatutaria"
				onCancel={onClose}
				isSubmitting={isSubmitting}
			>
				<FormSection title="Datos de la licencia">
					<FormInput<LicenciaEstatutariaUpdateFormValues>
						label="Artículo"
						name="articulo"
						register={register}
						error={errors.articulo?.message}
					/>

					<FormInput<LicenciaEstatutariaUpdateFormValues>
						label="Código"
						name="codigo"
						register={register}
						error={errors.codigo?.message}
					/>

					<FormInput<LicenciaEstatutariaUpdateFormValues>
						label="Nombre"
						name="nombre"
						register={register}
						error={errors.nombre?.message}
					/>

					<FormInput<LicenciaEstatutariaUpdateFormValues>
						label="Descripción"
						name="descripcion"
						register={register}
						error={errors.descripcion?.message}
					/>
				</FormSection>
			</Modal>
		</form>
	);
}
