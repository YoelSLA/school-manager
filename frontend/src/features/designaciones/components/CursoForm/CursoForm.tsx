import { useDesignacionCursoForm } from "@/features/designaciones/form/hooks/useDesignacionCursoForm";

import DesignacionFormLayout from "../DesignacionFormLayout/DesignacionFormLayout";
import { useMateriasSelect } from "@/features/materias/hooks/useMateriasSelect";
import { useAppSelector } from "@/store/hooks";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useCursosNombres } from "@/features/cursos/hooks/useCursosNombres";
import CursoSelectField from "@/components/forms/selects/CursoSelectField";
import MateriaSelectField from "@/components/forms/selects/MateriaSelectField";
import type { DesignacionCursoFormValues } from "../../types/designacion.types";
import type { SubmitHandler } from "react-hook-form";
import CupofCursoInputField from "@/components/forms/inputs/CupofInputField";

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
		cursos
	});

	const _onSubmitHandler: SubmitHandler<DesignacionCursoFormValues> =
		async (data) => {
			await onSubmit(data);
		};


	return (
		<form
			onSubmit={handleSubmit(
				async (data) => {
					console.log("✅ PASÓ VALIDACIÓN:", data);
					console.log("DATA:", data);

					console.log("typeof cupof:", typeof data.cupof);
					console.log("typeof cursoId:", typeof data.cursoId);
					console.log("typeof materiaId:", typeof data.materiaId);

					console.log("franjasHorarias:", data.franjasHorarias);
					console.log("es array?", Array.isArray(data.franjasHorarias));

					console.log("tipo dia:", typeof data.franjasHorarias[0]?.dia);
					_onSubmitHandler
				},
				(errors) => {
					console.log("❌ ERRORES:", errors);
				}
			)}
		>
			<DesignacionFormLayout
				left={
					<div>
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