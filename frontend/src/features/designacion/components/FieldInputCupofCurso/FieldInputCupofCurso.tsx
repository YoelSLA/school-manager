import type { UseFormRegister } from "react-hook-form";
import FormInputField from "@/shared/components/form/FormInput";
import type { DesignacionCursoFormValues } from "../../types";


type Props = {
  register: UseFormRegister<DesignacionCursoFormValues>;
  error?: string;
};

export default function FieldInputCupofCurso({ register, error }: Props) {
  return (
    <FormInputField<DesignacionCursoFormValues>
      label="CUPOF"
      name="cupof"
      type="number"
      register={register}
      error={error}
      inputProps={{ min: 1 }}
    />
  );
}
