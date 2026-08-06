import type { UseFormRegister } from "react-hook-form";
import FormInputField from "@/shared/components/form/FormInput"
import type { DesignacionAdministrativaFormValues } from "../../types";

type Props = {
  register: UseFormRegister<DesignacionAdministrativaFormValues>;
  error?: string;
};

export default function FieldInputCupofAdministrativa({
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
