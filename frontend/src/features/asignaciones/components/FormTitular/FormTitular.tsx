import type { UseFormReturn } from "react-hook-form";

import FormInputField from "@/components/forms/FormInputField/FormInputField";
import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";

import { CARACTERISTICA_ASIGNACION_OPTIONS } from "@/features/asignaciones/utils/asignaciones.utils";
import type { CubrirTitularFormValues } from "../../form/cubrirTitular.schema";

type Props = {
  form: UseFormReturn<CubrirTitularFormValues>;
};

export default function FormTitular({ form }: Props) {

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <FormSelectField<CubrirTitularFormValues>
        label="CARACTERÍSTICA"
        name="caracteristica"
        register={register}
        error={errors.caracteristica?.message}
      >
        {CARACTERISTICA_ASIGNACION_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </FormSelectField>

      <FormInputField<CubrirTitularFormValues>
        label="Fecha de toma de posesión"
        name="fechaTomaPosesion"
        type="date"
        register={register}
        error={errors.fechaTomaPosesion?.message}
      />
    </>
  );
}