import type { UseFormRegister } from "react-hook-form";
import FormInputField from "@/components/forms/FormInputField";
import { DesignacionAdministrativaFormValues } from "@/features/designaciones/types/designacion.types";

type Props = {
  register: UseFormRegister<DesignacionAdministrativaFormValues>;
  error?: string;
};

export default function CupofAdministrativaInputField({
  register,
  error,
}: Props) {
  return (
    <FormInputField<DesignacionAdministrativaFormValues>
      label="CUPOF"
      name="cupof"
      type="number"
      register={register}
      error={error}
      inputProps={{ min: 1 }}
    />
  );
}