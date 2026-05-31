import { useState } from "react";
import { FormProvider } from "react-hook-form";
import Breadcrumbs from "@/app/layouts/Breadcrumbs";
import PageLayout from "@/app/layouts/PageLayout/PageLayout";
import ErrorModal from "@/components/ModalError";
import { EmpleadoSelector } from "@/features/empleadosEducativos/components/EmpleadoSelector";
import { useDesignacionesActivas } from "@/features/empleadosEducativos/hooks/useDesignacionesActivas";
import { getErrorMessage } from "@/shared/api/errorHandler";
import type {
	LicenciaCreateDTO,
	LicenciaCreateFormValues,
} from "@/shared/utils/types";
import LicenciaDatosSection from "../../components/LicenciaForm";
import DesignacionesSelector from "../../components/LicenciaForm/DesignacionesSelector";
import { useLicenciaForm } from "../../form/useLicenciaForm";
import { useCrearLicencia } from "../../hooks/useCrearLicencia";
import styles from "./LicenciaCreatePage.module.scss";

type ErrorState = {
	title: string;
	message: string;
} | null;

export default function LicenciaCreatePage() {
	const { crearLicencia, isLoading, error } = useCrearLicencia();

	const { form } = useLicenciaForm();

	const [empleadoId, setEmpleadoId] = useState<number | null>(null);

	const [empleadoError, setEmpleadoError] = useState<string | null>(null);

	const [modalError, setModalError] = useState<ErrorState>(null);

	const designacionesIds = form.watch("designacionesIds") ?? [];

	const { data: designaciones, isLoading: loadingDesignaciones } =
		useDesignacionesActivas(empleadoId);

	const handleSubmit = async (data: LicenciaCreateFormValues) => {
		if (!empleadoId) {
			setEmpleadoError("Debe seleccionar un empleado");
			return;
		}

		const { fechaDesde, fechaHasta } = data.periodo;

		const periodo = fechaHasta
			? {
					tipo: "CERRADO" as const,
					fechaDesde,
					fechaHasta,
				}
			: {
					tipo: "ABIERTO" as const,
					fechaDesde,
				};

		const payload: LicenciaCreateDTO = {
			...data,
			periodo,
			designacionesIds: data.designacionesIds.map(Number),
		};

		try {
			await crearLicencia({
				empleadoId,
				payload,
			});
		} catch (err) {
			setModalError({
				title: "Error al crear licencia",
				message: getErrorMessage(err, "No se pudo crear la licencia"),
			});
		}
	};

	return (
		<PageLayout breadcrumbs={<Breadcrumbs />}>
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

										form.setValue("designacionesIds", []);
									}}
								/>

								{empleadoError && (
									<p className={styles.crearLicenciaError}>{empleadoError}</p>
								)}
							</div>

							<div className={styles.crearLicenciaDesignaciones}>
								<DesignacionesSelector
									designaciones={designaciones ?? []}
									loading={loadingDesignaciones}
									value={designacionesIds.map(Number)}
									onChange={(ids) => form.setValue("designacionesIds", ids)}
								/>
							</div>
						</aside>

						{/* DERECHA */}
						<main className={styles.crearLicenciaRight}>
							<LicenciaDatosSection
								form={form}
								isSubmitting={isLoading}
								error={error ? "No se pudo crear la licencia" : null}
							/>
						</main>
					</div>
				</form>
			</FormProvider>

			{modalError && (
				<ErrorModal error={modalError} onClose={() => setModalError(null)} />
			)}
		</PageLayout>
	);
}
