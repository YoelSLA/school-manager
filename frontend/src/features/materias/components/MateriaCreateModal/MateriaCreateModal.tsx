import FormInputField from "@/components/FormInputField";
import FormSection from "@/components/FormSection";
import Modal from "@/components/Modal/Modal";
import type {
	MateriaCreateDTO,
	MateriaCreateFormValues,
} from "@/shared/utils/types";
import { useCreateMateriaForm } from "../../form/hooks/useCreateMateriaForm";

type Props = {
	onClose: () => void;
	isSubmitting: boolean;
	onSubmit: (data: MateriaCreateDTO) => void;
};

export default function MateriaCreateModal({
	onClose,
	isSubmitting,
	onSubmit,
}: Props) {
	const { form } = useCreateMateriaForm();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	const toMateriaCreateDTO = (
		data: MateriaCreateFormValues,
	): MateriaCreateDTO => ({
		nombre: data.nombre,
		abreviatura: data.abreviatura,
		cantidadModulos: Number(data.cantidadModulos),
	});

	const handleFormSubmit = (data: MateriaCreateFormValues) =>
		onSubmit(toMateriaCreateDTO(data));

	return (
		<Modal
			title="Crear nueva materia"
			onCancel={onClose}
			confirmLabel="Crear"
			isSubmitting={isSubmitting}
		>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<FormSection layout="column">
					<FormInputField
						label="Nombre"
						name="nombre"
						register={register}
						error={errors.nombre?.message}
					/>

					<FormInputField
						label="Abreviatura"
						name="abreviatura"
						register={register}
						error={errors.abreviatura?.message}
					/>

					<FormInputField
						label="Módulos"
						name="cantidadModulos"
						type="number"
						register={register}
						error={errors.cantidadModulos?.message}
						inputProps={{ min: 1 }}
					/>
				</FormSection>
			</form>
		</Modal>
	);
}
