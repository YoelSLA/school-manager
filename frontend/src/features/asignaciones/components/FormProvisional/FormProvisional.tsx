import type { UseFormReturn } from "react-hook-form";

import FormInputField from "@/components/forms/FormInputField/FormInputField";
import type { CubrirProvisionalFormValues } from "../../form/cubrirProvisional.schema";

type Props = {
  form: UseFormReturn<CubrirProvisionalFormValues>;
};

export default function FormProvisional({ form }: Props) {

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <FormInputField<CubrirProvisionalFormValues>
        label="Fecha de toma de posesión"
        name="fechaTomaPosesion"
        type="date"
        register={register}
        error={errors.fechaTomaPosesion?.message}
      />

      <FormInputField<CubrirProvisionalFormValues>
        label="Fecha de cese"
        name="fechaCese"
        type="date"
        register={register}
        error={errors.fechaCese?.message}
      />
    </>
  );
}