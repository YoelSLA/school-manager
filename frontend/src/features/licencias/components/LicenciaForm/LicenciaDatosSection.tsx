import styles from "./LicenciaDatosSection.module.scss";
import Button from "@/components/Button";
import TipoLicenciaSelect from "@/features/licencias/components/TipoLicenciaSelect/TipoLicenciaSelect";
import FechaField from "@/components/forms/inputs/FechaInputField";
import DescripcionField from "@/components/forms/inputs/DescripcionInputField";
import FormSection from "@/components/FormSection";
import { UseFormReturn } from "react-hook-form";
import { CrearLicenciaFormValues } from "../../form/crearLicencia.schema";

type Props = {
	form: UseFormReturn<CrearLicenciaFormValues>;
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
					<FormSection title="Datos de la licencia" layout="column">

						<TipoLicenciaSelect
							register={register}
							name="tipoLicencia"
							error={errors.tipoLicencia?.message}
						/>

						<FechaField
							register={register}
							name="periodo.fechaDesde"
							label="Desde"
							error={errors.periodo?.fechaDesde?.message}
						/>

						<FechaField
							register={register}
							name="periodo.fechaHasta"
							label="Hasta (opcional)"
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
				{error && (
					<p className={styles.licenciaFormError}>
						{error}
					</p>
				)}

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