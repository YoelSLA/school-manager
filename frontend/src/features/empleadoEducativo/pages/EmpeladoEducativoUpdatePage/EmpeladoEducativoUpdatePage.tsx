import { BreadcrumbPageLayout } from "@/app/layouts/pages";
import Button from "@/shared/components/Button";
import { EmpleadoEducativoUpdateForm } from "../../components";
import { useEmpleadoEducativoUpdatePage } from "../../hooks/pages";
import styles from "./EmpleadoEducativoUpdatePage.module.scss";

export default function EmpleadoEducativoUpdatePage() {
  const vm = useEmpleadoEducativoUpdatePage();

  if (vm.query.isLoading) {
    return (
      <BreadcrumbPageLayout>
        <div className={styles.loading}>Cargando empleado...</div>
      </BreadcrumbPageLayout>
    );
  }

  return (
    <BreadcrumbPageLayout>
      <div className={styles.page}>
        <form onSubmit={vm.form.handleSubmit(vm.update.submit)}>
          <EmpleadoEducativoUpdateForm form={vm.form} />

          <div className={styles.actions}>
            <Button
              type="button"
              variant="danger"
              onClick={vm.cancel}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              variant="primary"
              loading={vm.update.isPending}
              disabled={vm.update.isPending}
            >
              Guardar cambios
            </Button>
          </div>
        </form>
      </div>
    </BreadcrumbPageLayout>
  );
}