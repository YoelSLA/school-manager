import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import { useListarCursos } from "@/features/curso/hooks";
import { useListMaterias } from "@/features/materia/hooks";
import { useCreateDesignacionCursoForm } from "../../../form/hooks/useCreateDesignacionCursoForm";
import type { DesignacionCursoCreateDTO } from "../../../types";
import { ORIENTACIONES } from "../../../utils/designacion.utils";
import FieldInputCupofCurso from "../../FieldInputCupofCurso"
import FieldSelectOrientacion from "../../FieldSelectOrientacion";
import FormSelectCurso from "../../FormSelectCurso";
import FormSelectMateria from "../../FormSelectMateria";
import styles from "./DesignacionCursoCreateForm.module.scss";
import DesignacionCursoFormLayout from "./DesignacionCursoFormLayout";

type Props = {
  onSubmit: (data: DesignacionCursoCreateDTO) => Promise<void>;
  isSubmitting: boolean;
};

export default function DesignacionCursoCreateForm({
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
  } = useCreateDesignacionCursoForm({
    materias,
    cursos,
    orientaciones: ORIENTACIONES.map((o) => o.value),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DesignacionCursoFormLayout
        left={
          <div className={styles.left}>
            <FieldInputCupofCurso
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
