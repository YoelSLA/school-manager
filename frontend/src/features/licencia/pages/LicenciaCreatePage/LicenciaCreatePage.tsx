import { FormProvider } from "react-hook-form";
import { BreadcrumbPageLayout } from "@/app/layouts/pages";
import { EmpleadoSelector } from "@/features/empleadoEducativo/components";
import { ModalError } from "@/shared/components/Modal";
import { AsignacionesSelector, LicenciaForm } from "../../components";
import { useLicenciaCreatePage } from "../../hooks/pages";
import styles from "./LicenciaCreatePage.module.scss";

export default function LicenciaCreatePage() {
  const vm = useLicenciaCreatePage();

  return (
    <BreadcrumbPageLayout>
      <FormProvider {...vm.form}>
        <form
          onSubmit={vm.form.handleSubmit(vm.create.submit)}
          className={styles.crearLicencia}
        >
          <section className={styles.empleado}>
            <EmpleadoSelector onChange={vm.empleado.onChange} />

            {vm.empleado.error && (
              <p className={styles.error}>
                {vm.empleado.error}
              </p>
            )}
          </section>

          <section className={styles.asignaciones}>
            <AsignacionesSelector
              asignaciones={vm.asignaciones.data ?? []}
              loading={vm.asignaciones.isLoading}
              value={vm.asignaciones.selectedIds}
              onChange={vm.asignaciones.onChange}
            />
          </section>

          <section className={styles.datos}>
            <LicenciaForm
              form={vm.form}
              isSubmitting={vm.create.isPending}
            />
          </section>
        </form>
      </FormProvider>

      {vm.error.modal && (
        <ModalError
          error={vm.error.modal}
          onClose={vm.error.close}
        />
      )}
    </BreadcrumbPageLayout>
  );
}