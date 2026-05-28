import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import CursoSelectField from "@/features/cursos/components/fields/CursoSelectField";
import { useCursosNombres } from "@/features/cursos/hooks/useCursosNombres";
import CupofCursoInputField from "@/features/designaciones/components/fields/CupofCursoInputField";
import OrientacionSelectField from "@/features/designaciones/components/fields/OrientacionSelectField";
import { useUpdateDesignacionCursoForm } from "@/features/designaciones/form/hooks/useUpdateDesignacionCursoForm";
import MateriaSelectField from "@/features/materias/components/fields/MateriaSelectField";
import { useMateriasSelect } from "@/features/materias/hooks/useMateriasSelect";
import type {
	DesignacionCursoDetalleDTO,
	DesignacionCursoUpdateDTO,
} from "@/shared/utils/types";
import DesignacionCursoFormLayout from "../DesignacionCursoCreate/DesignacionCursoFormLayout";
import styles from "../DesignacionCursoForm/DesignacionCursoForm.module.scss";

type Props = {
	designacion: DesignacionCursoDetalleDTO;
	onSubmit: (data: DesignacionCursoUpdateDTO) => Promise<void>;
	isSubmitting: boolean;
};

export default function DesignacionCursoUpdate({
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
	} = useUpdateDesignacionCursoForm({
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
