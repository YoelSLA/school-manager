import type {
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import { CAUSAS_BAJA } from "@/features/empleadosEducativos/utils/empleadosEducativos.utils";

type Props<TFormValues extends FieldValues> = {
  register: UseFormRegister<TFormValues>;
  error?: string;
  name: Path<TFormValues>;
};

export default function CausaBajaSelectField<
  TFormValues extends FieldValues
>({
  register,
  error,
  name,
}: Props<TFormValues>) {
  return (
    <FormSelectField
      label="Motivo de baja"
      name={name}
      register={register}
      error={error}
    >
      {CAUSAS_BAJA.map((c) => (
        <option key={c.value} value={c.value}>
          {c.label}
        </option>
      ))}
    </FormSelectField>
  );
}
