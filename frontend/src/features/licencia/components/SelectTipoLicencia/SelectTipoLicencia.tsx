import { FileText } from "lucide-react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { useListLicenciasEstatutariasSelect } from "@/features/licenciaEstatutaria/hooks/queries";
import { SelectForm } from "@/shared/components/Select";
import { agruparPorArticulo, formatLicenciaLabel } from "../../utils";

type Props<T extends FieldValues> = {
	register: UseFormRegister<T>;
	name: Path<T>;
	error?: string;
	disabled?: boolean;
};

export default function SelectTipoLicencia<T extends FieldValues>({
	register,
	name,
	error,
	disabled = false,
}: Props<T>) {
	const { data: licencias = [], isLoading } =
		useListLicenciasEstatutariasSelect();

	return (
		<SelectForm<T>
			label={
				<>
					<FileText size={14} />
					Tipo de licencia
				</>
			}
			name={name}
			register={register}
			error={error}
			disabled={disabled || isLoading}
		>
			{Object.entries(agruparPorArticulo(licencias)).map(
				([articulo, licenciasArticulo]) => (
					<optgroup key={articulo} label={articulo}>
						{licenciasArticulo.map((licencia) => (
							<option key={licencia.id} value={licencia.id}>
								{formatLicenciaLabel(licencia.codigo, licencia.descripcion)}
							</option>
						))}
					</optgroup>
				),
			)}
		</SelectForm>
	);
}
