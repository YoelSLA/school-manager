import FormInputField from "@/components/forms/FormInputField/FormInputField";
import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import type { CrearCursoFormInput, CrearCursoFormOutput } from "../../form/curso.form.types";
import { useCrearCursoForm } from "../../form/useCrearCursoForm";
import { TURNO_OPTIONS } from "../../utils/cursos.utils";

type Props = {
  onSubmit: (data: CrearCursoFormOutput) => void;
  onSubmitRef: (submit: () => void) => void;
};

export default function CrearCursoForm({ onSubmit, onSubmitRef }: Props) {
  const { form } = useCrearCursoForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  // 👇 Exponemos el submit al modal
  onSubmitRef(handleSubmit(onSubmit));

  return (
    <form>
      <FormSelectField<CrearCursoFormInput>
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
      </FormSelectField>
      <FormInputField
        label="Año"
        name="anio"
        type="number"
        register={register}
        error={errors.anio?.message}
        inputProps={{ min: 1 }}
      />

      <FormInputField
        label="Grado"
        name="grado"
        type="number"
        register={register}
        error={errors.grado?.message}
        inputProps={{ min: 1 }}
      />
    </form>
  );
}
