import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import CursoSelectField from "@/features/cursos/components/fields/CursoSelectField";
import { useListarCursos } from "@/features/cursos/hooks/useListarCursos";
import CupofCursoInputField from "@/features/designaciones/components/fields/CupofCursoInputField";
import OrientacionSelectField from "@/features/designaciones/components/fields/OrientacionSelectField";
import { useUpdateDesignacionCursoForm } from "@/features/designaciones/form/hooks/useUpdateDesignacionCursoForm";
import MateriaSelectField from "@/features/materias/components/fields/MateriaSelectField";
import { useListMaterias } from "@/features/materias/hooks/useListMaterias";
import type {
	DesignacionCursoDetalleDTO,
	DesignacionCursoUpdateDTO,
} from "@/shared/types";
import DesignacionCursoFormLayout from "../DesignacionCursoCreate/DesignacionCursoFormLayout";
import styles from "../DesignacionCursoCreateForm/DesignacionCursoCreateForm.module.scss";

type Props = {
	designacion: DesignacionCursoDetalleDTO;
	onSubmit: (data: DesignacionCursoUpdateDTO) => Promise<void>;
	isSubmitting: boolean;
};

export default function DesignacionCursoUpdateForm({
	designacion,
	onSubmit,
	isSubmitting,
}: Props) {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const { data: materiasPage, isLoading: isLoadingMaterias } = useListMaterias(
		escuelaActiva?.id,
		0,
		1000,
	);

	const { data: cursosPage, isLoading: isLoadingCursos } = useListarCursos(
		escuelaActiva?.id,
		"TODOS",
		0,
		1000,
	);

	const materias = materiasPage?.content ?? [];
	const cursos = cursosPage?.content ?? [];

	const {
		form: {
			register,
			handleSubmit,
			formState: { errors },
		},
		franjas: { fields, append, remove },
	} = useUpdateDesignacionCursoForm({
		designacion,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
