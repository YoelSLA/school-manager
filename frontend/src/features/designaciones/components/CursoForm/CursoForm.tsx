import type {
	DesignacionCursoFormInput,
	DesignacionCursoFormOutput,
} from "@/features/designaciones/form/designacion.form.types";
import { useDesignacionCursoForm } from "@/features/designaciones/form/hooks/useDesignacionCursoForm";

import DesignacionFormLayout from "../DesignacionFormLayout/DesignacionFormLayout";
import styles from "./CursoForm.module.scss";
import { useMateriasSelect } from "@/features/materias/hooks/useMateriasSelect";
import { useAppSelector } from "@/store/hooks";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useCursosNombres } from "@/features/cursos/hooks/useCursosNombres";
import { ORIENTACIONES } from "../../utils/designacion.utils";
import CupofInputField from "@/components/forms/inputs/CupofInputField";
import CursoSelectField from "@/components/forms/selects/CursoSelectField";
import MateriaSelectField from "@/components/forms/selects/MateriaSelectField";
import OrientacionSelectField from "@/components/forms/selects/OrientacionSelectField";

type Props = {
	onSubmit: (data: DesignacionCursoFormOutput) => Promise<void>;
	isSubmitting: boolean;
};

export default function CursoForm({ onSubmit, isSubmitting }: Props) {

	const escuelaActiva = useAppSelector(selectEscuelaActiva)

	const {
		materias,
		isLoading: isLoadingMaterias,
	} = useMateriasSelect(escuelaActiva?.id);

	const {
		cursos,
		isLoading: isLoadingCursos,
	} = useCursosNombres(escuelaActiva?.id);

	const {
		form: {
			register,
			handleSubmit,
			formState: { errors },
		},
		franjas: { fields, append, remove },
	} = useDesignacionCursoForm({ materias, cursos, orientaciones: ORIENTACIONES.map((o) => o.value) });

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<DesignacionFormLayout<DesignacionCursoFormInput>
				left={<div className={styles["curso-form"]}>
					{/* Fila 1: Cupof + Curso */}
					<div className={styles["curso-form__row"]}>
						<CupofInputField<DesignacionCursoFormInput>
							register={register}
							name="cupof"
							error={errors.cupof?.message}
						/>

						<CursoSelectField
							register={register}
							cursos={cursos}
							isLoading={isLoadingCursos}
							error={errors.cursoId?.message}
						/>
					</div>

					{/* Fila 2: Materia */}
					<div className={styles["curso-form__full"]}>
						<MateriaSelectField
							register={register}
							materias={materias}
							isLoading={isLoadingMaterias}
							error={errors.materiaId?.message}
						/>
					</div>

					{/* Fila 3: Orientación */}
					<div className={styles["curso-form__full"]}>
						<OrientacionSelectField register={register} />
					</div>
				</div>}
				fields={fields}
				register={register}
				append={append}
				remove={remove}
				isSubmitting={isSubmitting}
			/>
		</form>
	);
}
