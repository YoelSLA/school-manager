import type { UseFormRegister } from "react-hook-form";
import FormSelectField from "@/shared/components/form/FormSelect/FormSelect";
import type { DesignacionCursoFormValues } from "../../types";
import { ORIENTACIONES } from "../../utils/designacion.utils";


type Props = {
  register: UseFormRegister<DesignacionCursoFormValues>;
  error?: string;
};

export default function FieldSelectOrientacion({ register, error }: Props) {
  return (
    <FormSelectField<DesignacionCursoFormValues>
      label="Orientación"
      name="orientacion"
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
