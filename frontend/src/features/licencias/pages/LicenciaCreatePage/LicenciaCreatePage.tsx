import PageLayout from "@/layout/PageLayout/PageLayout";
import LicenciaForm from "../../components/LicenciaForm/LicenciaForm";
import type { LicenciaFormOutput } from "../../form/licencia.form.types";
import { useCrearLicencia } from "../../hooks/useCrearLicencia";
import styles from "./LicenciaCreatePage.module.scss";
import type { LicenciaCreateDTO } from "../../types/licencia.types";

export default function LicenciaCreatePage() {
	const { crearLicencia, isLoading, error } = useCrearLicencia();

	const handleSubmit = async (
		empleadoId: number,
		data: LicenciaFormOutput
	) => {
		const payload: LicenciaCreateDTO = {
			tipoLicencia: data.tipoLicencia,
			periodo: {
				fechaDesde: data.fechaDesde,
				fechaHasta: data.fechaHasta || null,
			},
			descripcion: data.descripcion || undefined,
		};

		crearLicencia({
			empleadoId,
			payload,
		});
	};

	return (
		<PageLayout>
			<section className={styles["crear-licencia"]}>
				<div className={styles["crear-licencia__form"]}>
					<LicenciaForm
						onSubmit={handleSubmit}
						isSubmitting={isLoading}
						error={error ? "No se pudo crear la licencia" : null}
					/>
				</div>
			</section>
		</PageLayout>
	);
}
