import CupofCursoInputField from "@/components/forms/inputs/CupofCursoInputField";
import CursoSelectField from "@/components/forms/selects/CursoSelectField";
import MateriaSelectField from "@/components/forms/selects/MateriaSelectField";
import OrientacionSelectField from "@/components/forms/selects/OrientacionSelectField";
import { useCursosNombres } from "@/features/cursos/hooks/useCursosNombres";
import { useMateriasSelect } from "@/features/materias/hooks/useMateriasSelect";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import type {
	DesignacionCursoDetalleDTO,
	DesignacionCursoUpdateDTO,
} from "@/utils/types";
import { useEditarDesignacionCursoForm } from "../../form/hooks/useEditDesignacionCursoForm";
import styles from "../CreateDesignacionCurso/CursoForm/CursoForm.module.scss";
import DesignacionCursoFormLayout from "../CreateDesignacionCurso/DesignacionCursoFormLayout";

type Props = {
	designacion: DesignacionCursoDetalleDTO;
	onSubmit: (data: DesignacionCursoUpdateDTO) => Promise<void>;
	isSubmitting: boolean;
};

export default function UpdateDesignacionCurso({
	designacion,
	onSubmit,
	isSubmitting,
}: Props) {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const { cursos, isLoading: isLoadingCursos } = useCursosNombres(
		escuelaActiva?.id,
	);

	const { materias, isLoading: isLoadingMaterias } = useMateriasSelect(
		escuelaActiva?.id,
	);

	const {
		form: {
			register,
			handleSubmit,
			formState: { errors },
		},
		franjas: { fields, append, remove },
	} = useEditarDesignacionCursoForm({
		designacion,
		materias,
		cursos,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.header}>
				<h1 className={styles.title}>Editar designación</h1>
				<p className={styles.subtitle}>
					Modificá los datos de la designación del curso
				</p>
			</div>

			<DesignacionCursoFormLayout
				left={
					<div className={styles.left}>
						<CupofCursoInputField
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
