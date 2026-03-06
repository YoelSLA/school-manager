import { useDesignacionCursoForm } from "@/features/designaciones/form/hooks/useDesignacionCursoForm";
import DesignacionFormLayout from "../DesignacionFormLayout/DesignacionFormLayout";
import { useMateriasSelect } from "@/features/materias/hooks/useMateriasSelect";
import { useAppSelector } from "@/store/hooks";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useCursosNombres } from "@/features/cursos/hooks/useCursosNombres";
import CursoSelectField from "@/components/forms/selects/CursoSelectField";
import MateriaSelectField from "@/components/forms/selects/MateriaSelectField";
import type { SubmitHandler } from "react-hook-form";
import type { DesignacionCursoFormValues } from "../../form/designacion.form.types";
import CupofInputField from "@/components/forms/inputs/CupofInputField";
import styles from "./CursoForm.module.scss";
import OrientacionSelectField from "@/components/forms/selects/OrientacionSelectField";
import { ORIENTACIONES } from "../../utils/designacion.utils";

type Props = {
	onSubmit: (data: DesignacionCursoFormValues) => Promise<void>;
	isSubmitting: boolean;
};

export default function CursoForm({ onSubmit, isSubmitting }: Props) {

	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const { materias, isLoading: isLoadingMaterias } =
		useMateriasSelect(escuelaActiva?.id);

	const { cursos, isLoading: isLoadingCursos } =
		useCursosNombres(escuelaActiva?.id);

	const {
		form: { register, handleSubmit, formState: { errors } },
		franjas: { fields, append, remove },
	} = useDesignacionCursoForm({
		materias,
		cursos,
		orientaciones: ORIENTACIONES.map(o => o.value)

	});

	const _onSubmitHandler: SubmitHandler<DesignacionCursoFormValues> =
		async (data) => {
			await onSubmit(data);
		};

	return (
		<form onSubmit={handleSubmit(_onSubmitHandler)}>
			<DesignacionFormLayout<DesignacionCursoFormValues>
				left={
					<div className={styles.left}>
						<CupofInputField<DesignacionCursoFormValues>
							register={register}
							error={errors.cupof?.message}
						/>

						<CursoSelectField
							register={register}
							cursos={cursos}
							isLoading={isLoadingCursos}
							error={errors.cursoId?.message}
						/>

						<MateriaSelectField
							register={register}
							materias={materias}
							isLoading={isLoadingMaterias}
							error={errors.materiaId?.message}
						/>

						<OrientacionSelectField
							register={register}
							error={errors.orientacion?.message}
						/>
					</div>

				}
				fields={fields}
				register={register}
				append={append}
				remove={remove}
				isSubmitting={isSubmitting}
			/>
		</form>
	);
}