import type { FieldValues, Path, UseFormRegister, } from "react-hook-form";
import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import { ORIENTACIONES } from "@/features/designaciones/utils/designacion.utils";


type Props<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
};
export default function OrientacionSelectField<
  T extends FieldValues
>({ name, register, error }: Props<T>) {
  return (
    <FormSelectField
      label="Orientación"
      name={name}
      register={register}
      error={error}
    >
      {ORIENTACIONES.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </FormSelectField>
  );
}
