import FormInputField from "@/components/forms/FormInputField/FormInputField";
import type { CrearMateriaFormOutput } from "../../form/materias.form.types";
import { useMateriaForm } from "../../form/useMateriaForm";

type Props = {
	onSubmit: (data: CrearMateriaFormOutput) => void;
	onSubmitRef: (submit: () => void) => void;
};

export default function MateriaForm({ onSubmit, onSubmitRef }: Props) {
	const { form } = useMateriaForm();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	// 👇 le damos el submit al padre
	onSubmitRef(handleSubmit(onSubmit));

	return (
		<form>
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
		</form>
	);
}
