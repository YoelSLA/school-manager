import { useState } from "react";
import { FormProvider } from "react-hook-form";
import Breadcrumbs from "@/app/layouts/Breadcrumbs";
import PageLayout from "@/app/layouts/PageLayout/PageLayout";
import ErrorModal from "@/components/ModalError";
import { EmpleadoSelector } from "@/features/empleadosEducativos/components/EmpleadoSelector";
import { useAsignacionesActivas } from "@/features/empleadosEducativos/hooks/useAsignacionesActivas";
import { getErrorMessage } from "@/shared/api/errorHandler";
import type {
  LicenciaCreateDTO,
  LicenciaCreateFormValues,
} from "@/shared/types";
import LicenciaDatosSection from "../../components/LicenciaForm";
import AsignacionesSelector from "../../components/AsignacionesSelector";
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

  const asignacionesIds = form.watch("asignacionesIds") ?? [];

  const { data: asignaciones, isLoading: loadingAsignaciones } =
    useAsignacionesActivas(empleadoId);

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
      asignacionesIds: data.asignacionesIds.map(Number),
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

                    form.setValue("asignacionesIds", []);
                  }}
                />

                {empleadoError && (
                  <p className={styles.crearLicenciaError}>{empleadoError}</p>
                )}
              </div>

              <div className={styles.crearLicenciaDesignaciones}>
                <AsignacionesSelector
                  asignaciones={asignaciones ?? []}
                  loading={loadingAsignaciones}
                  value={asignacionesIds.map(Number)}
                  onChange={(ids) => form.setValue("asignacionesIds", ids)}
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
