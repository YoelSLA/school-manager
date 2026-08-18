import { FormInput, FormSection } from "@/shared/components/Form";
import { Modal } from "@/shared/components/Modal";
import { SelectForm } from "@/shared/components/Select";
import { useCrearCursoForm } from "../../form/hooks";
import type { CursoCreateDTO, CursoCreateFormValues } from "../../types";
import { TURNO_OPTIONS } from "../../utils/cursos.utils";

type Props = {
	onClose: () => void;
	isSubmitting: boolean;
	onSubmit: (data: CursoCreateDTO) => void;
};

export default function CursoModalCreate({
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
	} = useCrearCursoForm();

	const handleFormSubmit = (data: CursoCreateFormValues) => {
		onSubmit({
			turno: data.turno,
			anio: Number(data.anio),
			grado: Number(data.grado),
		});
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Modal
				title="Nuevo curso"
				onCancel={onClose}
				confirmLabel="Crear"
				isSubmitting={isSubmitting}
			>
				<FormSection title="Datos del curso" layout="column">
					<SelectForm<CursoCreateFormValues>
						label="Turno"
						name="turno"
						register={register}
						error={errors.turno?.message}
					>
						{TURNO_OPTIONS.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</SelectForm>

					<FormInput<CursoCreateFormValues>
						label="Año"
						name="anio"
						type="number"
						register={register}
						error={errors.anio?.message}
						inputProps={{ min: 1 }}
					/>

					<FormInput<CursoCreateFormValues>
						label="Grado"
						name="grado"
						type="number"
						register={register}
						error={errors.grado?.message}
						inputProps={{ min: 1 }}
					/>
				</FormSection>
			</Modal>
		</form>
	);
}
