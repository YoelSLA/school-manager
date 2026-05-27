import Button from "@/components/Button";
import FormSection from "@/components/FormSection";
import DescripcionField from "@/features/designaciones/components/fields/DescripcionInputField";
import FechaField from "@/features/designaciones/components/fields/FechaInputField";
import TipoLicenciaSelect from "@/features/licencias/components/TipoLicenciaSelect/TipoLicenciaSelect";
import type { LicenciaCreateFormValues } from "@/shared/utils/types";
import type { UseFormReturn } from "react-hook-form";
import styles from "./LicenciaDatosSection.module.scss";

type Props = {
	form: UseFormReturn<LicenciaCreateFormValues>;
	isSubmitting: boolean;
	error?: string | null;
};

export default function LicenciaDatosSection({
	form,
	error,
	isSubmitting,
}: Props) {
	const {
		register,
		formState: { errors },
	} = form;

	return (
		<div className={styles.licenciaForm}>
			<div className={styles.licenciaFormContent}>
				<div className={styles.licenciaSection}>
					<FormSection title="Datos de la licencia" layout="column" grow={true}>
						<TipoLicenciaSelect
							register={register}
							name="tipoLicencia"
							error={errors.tipoLicencia?.message}
						/>

						<FechaField
							register={register}
							name="periodo.fechaDesde"
							label="FECHA DESDE"
							error={errors.periodo?.fechaDesde?.message}
						/>

						<FechaField
							register={register}
							name="periodo.fechaHasta"
							label="FECHA HASTA"
							error={errors.periodo?.fechaHasta?.message}
						/>

						<DescripcionField
							register={register}
							name="descripcion"
							error={errors.descripcion?.message}
						/>
					</FormSection>
				</div>
			</div>

			<footer className={styles.licenciaFormFooter}>

				<Button
					type="submit"
					variant="primary"
					size="md"
					disabled={isSubmitting}
				>
					Crear licencia
				</Button>
			</footer>
		</div>
	);
}
