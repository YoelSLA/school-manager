import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import { useListarCursos } from "@/features/curso/hooks";
import { useListMaterias } from "@/features/materia/hooks";
import { useDesignacionCursoFormUpdate } from "../../../form/hooks";
import type { DesignacionCursoDetalleDTO, DesignacionCursoUpdateDTO } from "../../../types";
import { DesignacionCursoFormLayout } from "../../DesignacionCurso";
import FieldInputCupoCurso from "../../FieldInputCupoCurso";
import FieldSelectOrientacion from "../../FieldSelectOrientacion";
import FormSelectCurso from "../../FormSelectCurso";
import FormSelectMateria from "../../FormSelectMateria";
import styles from "../../DesignacionCurso/DesignacionCursoForm.module.scss";

type Props = {
  designacion: DesignacionCursoDetalleDTO;
  onSubmit: (data: DesignacionCursoUpdateDTO) => Promise<void>;
  isSubmitting: boolean;
};

export default function DesignacionCursoFormUpdate({
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
  } = useDesignacionCursoFormUpdate({
    designacion,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DesignacionCursoFormLayout
        left={
          <div className={styles.left}>
            <FieldInputCupoCurso
              register={register}
              error={errors.cupof?.message}
            />

            <FormSelectCurso
              register={register}
              cursos={cursos}
              isLoading={isLoadingCursos}
              invalid={!!errors.cursoId}
            />


            <FormSelectMateria
              register={register}
              materias={materias}
              isLoading={isLoadingMaterias}
              invalid={!!errors.materiaId}
            />

            <FieldSelectOrientacion
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
