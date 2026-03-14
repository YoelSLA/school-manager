import { useState } from "react";
import { FormProvider } from "react-hook-form";

import PageLayout from "@/layout/PageLayout/PageLayout";
import { EmpleadoSelector } from "@/features/empleadosEducativos/components/EmpleadoSelector";
import { useCrearLicencia } from "../../hooks/useCrearLicencia";
import { useDesignacionesActivas } from "@/features/empleadosEducativos/hooks/useDesignacionesActivas";
import { useLicenciaForm } from "../../form/useLicenciaForm";
import styles from "./LicenciaCreatePage.module.scss";
import { CrearLicenciaFormValues } from "../../form/crearLicencia.schema";
import { LicenciaCreateDTO } from "../../types/licencia.types";
import DesignacionesSelector from "../../components/LicenciaForm/DesignacionesSelector";
import LicenciaDatosSection from "../../components/LicenciaForm";

export default function LicenciaCreatePage() {
	const { crearLicencia, isLoading, error } = useCrearLicencia();

	const { form } = useLicenciaForm();

	const [empleadoId, setEmpleadoId] = useState<number | null>(null);
	const [empleadoError, setEmpleadoError] = useState<string | null>(null);

	const designacionesIds = form.watch("designacionesIds") ?? [];

	const { data: designaciones, isLoading: loadingDesignaciones } =
		useDesignacionesActivas(empleadoId);

	const handleSubmit = async (data: CrearLicenciaFormValues) => {
		console.log("📥 Submit data:", data);
		console.log("👤 empleadoId:", empleadoId);

		if (!empleadoId) {
			setEmpleadoError("Debe seleccionar un empleado");
			return;
		}

		const payload: LicenciaCreateDTO = {
			tipoLicencia: data.tipoLicencia,
			periodo: {
				fechaDesde: data.periodo.fechaDesde,
				fechaHasta: data.periodo.fechaHasta ?? null,
			},
			descripcion: data.descripcion,
			designacionesIds: data.designacionesIds,
		};

		console.log("📦 Payload generado:", payload);

		try {
			const result = await crearLicencia({
				empleadoId,
				payload,
			});

			console.log("✅ Licencia creada:", result);
		} catch (error) {
			console.error("❌ Error al crear licencia:", error);
		}
	};

	return (
		<PageLayout>
			<FormProvider {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className={styles.crearLicencia}
				>
					<div className={styles.crearLicenciaGrid}>

						{/* IZQUIERDA */}
						<aside className={styles.crearLicenciaLeft}>
							<div className={styles.crearLicenciaEmpleado}>
								<EmpleadoSelector
									onChange={(empleado) => {
										setEmpleadoId(empleado?.id ?? null);
										setEmpleadoError(null);

										// resetear designaciones al cambiar empleado
										form.setValue("designacionesIds", []);
									}}
								/>

								{empleadoError && (
									<p className={styles.crearLicenciaError}>
										{empleadoError}
									</p>
								)}
							</div>

							<div className={styles.crearLicenciaDesignaciones}>
								<DesignacionesSelector
									designaciones={designaciones ?? []}
									loading={loadingDesignaciones}
									value={designacionesIds}
									onChange={(ids) =>
										form.setValue("designacionesIds", ids)
									}
								/>
							</div>
						</aside>

						{/* DERECHA */}
						<main className={styles.crearLicenciaRight}>
							<LicenciaDatosSection
								form={form}
								isSubmitting={isLoading}
								error={
									error
										? "No se pudo crear la licencia"
										: null
								}
							/>
						</main>

					</div>
				</form>
			</FormProvider>
		</PageLayout>
	);
}