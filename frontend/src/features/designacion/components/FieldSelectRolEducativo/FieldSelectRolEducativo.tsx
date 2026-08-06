import type { UseFormRegister } from "react-hook-form";
import FormSelectField from "@/shared/components/form/FormSelect/FormSelect";
import { RolEducativo } from "@/shared/types/enums";
import type { DesignacionAdministrativaFormValues } from "../../types";
import { ROL_EDUCATIVO_LABELS } from "../../utils/designacion.utils";

type Props = {
  register: UseFormRegister<DesignacionAdministrativaFormValues>;
  error?: string;
  disabled?: boolean;
};

export default function FieldSelectRolEducativo({
  register,
  error,
  disabled = false,
}: Props) {
  return (
    <FormSelectField<DesignacionAdministrativaFormValues>
      label="Rol educativo"
      name="rolEducativo"
      register={register}
      registerOptions={{
        required: "Debe seleccionar un rol educativo",
      }}
      disabled={disabled}
      error={error}
    >
      {Object.values(RolEducativo)
        .sort((a, b) =>
          ROL_EDUCATIVO_LABELS[a].localeCompare(ROL_EDUCATIVO_LABELS[b], "es", {
            sensitivity: "base",
          }),
        )
        .map((rol) => (
          <option key={rol} value={rol}>
            {ROL_EDUCATIVO_LABELS[rol]}
          </option>
        ))}
    </FormSelectField>
  );
}
