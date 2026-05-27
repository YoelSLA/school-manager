import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import CursoSelectField from "@/features/cursos/components/fields/CursoSelectField";
import { useCursosNombres } from "@/features/cursos/hooks/useCursosNombres";
import CupofCursoInputField from "@/features/designaciones/components/fields/CupofCursoInputField";
import OrientacionSelectField from "@/features/designaciones/components/fields/OrientacionSelectField";
import { useDesignacionCursoForm } from "@/features/designaciones/form/hooks/useDesignacionCursoForm";
import MateriaSelectField from "@/features/materias/components/fields/MateriaSelectField";
import { useMateriasSelect } from "@/features/materias/hooks/useMateriasSelect";
import type { DesignacionCursoCreateDTO } from "@/shared/utils/types";
import { ORIENTACIONES } from "../../../utils/designacion.utils";
import DesignacionCursoFormLayout from "../DesignacionCursoFormLayout";
import styles from "./CursoForm.module.scss";

type Props = {
	onSubmit: (data: DesignacionCursoCreateDTO) => Promise<void>;
	isSubmitting: boolean;
};

export default function CursoForm({ onSubmit, isSubmitting }: Props) {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const { materias, isLoading: isLoadingMaterias } = useMateriasSelect(
		escuelaActiva?.id,
	);

	const { cursos, isLoading: isLoadingCursos } = useCursosNombres(
		escuelaActiva?.id,
	);

	const {
		form: {
			register,
			handleSubmit,
			formState: { errors },
		},
		franjas: { fields, append, remove },
	} = useDesignacionCursoForm({
		materias,
		cursos,
		orientaciones: ORIENTACIONES.map((o) => o.value),
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
