import type { UseFormRegister } from "react-hook-form";
import { FormInput } from "@/shared/components/Form";
import type { DesignacionCursoFormValues } from "../../types";


type Props = {
  register: UseFormRegister<DesignacionCursoFormValues>;
  error?: string;
};

export default function FieldInputCupoCurso({ register, error }: Props) {
  return (
    <FormInput<DesignacionCursoFormValues>
      label="CUPOF"
      name="cupof"
      type="number"
      register={register}
      error={error}
      inputProps={{ min: 1 }}
    />
  );
}
