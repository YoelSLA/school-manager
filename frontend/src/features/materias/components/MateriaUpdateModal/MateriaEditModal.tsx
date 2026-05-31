import FormInputField from "@/components/FormInputField";
import FormSection from "@/components/FormSection";
import Modal from "@/components/Modal/Modal";
import { useUpdateMateriaForm } from "@/features/materias/form/hooks/useUpdateMateriaForm";
import type {
	MateriaUpdateDTO,
	MateriaUpdateFormValues,
} from "@/shared/utils/types";

type Props = {
	materia: MateriaUpdateDTO;
	onClose: () => void;
	isSubmitting: boolean;
	onSubmit: (data: MateriaUpdateDTO) => void;
};

export default function MateriaUpdateModal({
	materia,
	onClose,
	isSubmitting,
	onSubmit,
}: Props) {
	const { form } = useUpdateMateriaForm({ materia });

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	const toMateriaUpdateDTO = (
		data: MateriaUpdateFormValues,
	): MateriaUpdateDTO => ({
		nombre: data.nombre,
		abreviatura: data.abreviatura,
		cantidadModulos: Number(data.cantidadModulos),
	});

	const handleFormSubmit = (data: MateriaUpdateFormValues) => {
		onSubmit(toMateriaUpdateDTO(data));
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Modal
				title="Editar materia"
				onCancel={onClose}
				confirmLabel="Guardar cambios"
				isSubmitting={isSubmitting}
			>
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
			</Modal>
		</form>
	);
}
