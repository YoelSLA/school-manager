import { Calendar } from "lucide-react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import FormInputField from "@/shared/components/form/FormInput/FormInput";

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
  error?: string;
};

export default function FormInputDate<T extends FieldValues>({
  register,
  name,
  label,
  error,
}: Props<T>) {
  return (
    <FormInputField<T>
      label={
        <>
          <Calendar size={14} />
          {label}
        </>
      }
      name={name}
      type="date"
      register={register}
      error={error}
    />
  );
}
