import { FileText } from "lucide-react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

import { agruparPorArticulo, formatLicenciaLabel } from "@/utils";
import FormSelectField from "../../../../components/forms/FormSelectField/FormSelectField";
import { TIPOS_LICENCIA } from "../../utils/tipoLicencia";

type Props<T extends FieldValues> = {
	register: UseFormRegister<T>;
	name: Path<T>;
	error?: string;
	disabled?: boolean;
};

export default function TipoLicenciaSelect<T extends FieldValues>({
	register,
	name,
	error,
	disabled = false,
}: Props<T>) {
	return (
		<FormSelectField<T>
			label={
				<>
					<FileText size={14} />
					Tipo de licencia
				</>
			}
			name={name}
			register={register}
			error={error}
			disabled={disabled}
		>
			{Object.entries(agruparPorArticulo(TIPOS_LICENCIA)).map(
				([articulo, licencias]) => (
					<optgroup key={articulo} label={articulo}>
						{licencias.map((t) => (
							<option key={t.enumValue} value={t.enumValue}>
								{formatLicenciaLabel(t.codigo, t.descripcion)}
							</option>
						))}
					</optgroup>
				),
			)}
		</FormSelectField>
	);
}
