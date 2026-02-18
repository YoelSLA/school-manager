import type { UseFormRegister } from "react-hook-form";
import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import type { DesignacionAdministrativaFormInput } from "@/features/designaciones/form/designacion.form.types";
import { RolEducativo } from "@/features/designaciones/types/designacion.types";
import { ROL_EDUCATIVO_LABELS } from "@/features/designaciones/utils/designacion.utils";

type Props = {
  register: UseFormRegister<DesignacionAdministrativaFormInput>;
  error?: string;
  disabled?: boolean;
};

export default function RolEducativoSelectField({
  register,
  error,
  disabled = false,
}: Props) {
  return (
    <FormSelectField
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
          ROL_EDUCATIVO_LABELS[a].localeCompare(
            ROL_EDUCATIVO_LABELS[b],
            "es",
            { sensitivity: "base" },
          ),
        )
        .map((rol) => (
          <option key={rol} value={rol}>
            {ROL_EDUCATIVO_LABELS[rol]}
          </option>
        ))}
    </FormSelectField>
  );
}
