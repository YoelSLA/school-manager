import { BreadcrumbPageLayout } from "@/app/layouts/pages";
import { Button } from "@/shared/components";
import { FormActions } from "@/shared/components/form";
import { Modal } from "@/shared/components/Modal";
import ContactoSection from "../../components/EmpleadoEducativoCreateForm/ContactoSection";
import DatosPersonalesSection from "../../components/EmpleadoEducativoCreateForm/DatosPersonalesSection";
import IngresoSection from "../../components/EmpleadoEducativoCreateForm/IngresoSection";
import { useEmpleadoEducativoCreatePage } from "../../hooks/pages";
import styles from "./EmpleadoEducativoCreatePage.module.scss";

export default function EmpleadoEducativoCreatePage() {
  const vm = useEmpleadoEducativoCreatePage();

  return (
    <BreadcrumbPageLayout>
      <div className={styles.page}>
        <div className={styles.container}>
          <form
            className={styles.form}
            onSubmit={vm.form.handleSubmit(vm.submit)}
          >
            <div className={styles.grid}>
              <div className={styles.datos}>
                <DatosPersonalesSection
                  register={vm.form.register}
                  errors={vm.form.errors}
                />
              </div>

              <div className={styles.rightColumn}>
                <ContactoSection
                  register={vm.form.register}
                  errors={vm.form.errors}
                />

                <IngresoSection
                  register={vm.form.register}
                  errors={vm.form.errors}
                  agregarFecha={vm.ingreso.agregarFecha}
                  usarHoy={vm.ingreso.usarHoy}
                  onToggleAgregarFecha={vm.ingreso.toggleAgregarFecha}
                  onToggleUsarHoy={vm.ingreso.toggleUsarHoy}
                />
              </div>

              <div className={styles.actions}>
                <FormActions
                  isSubmitting={vm.form.isSubmitting}
                  label="Guardar"
                  align="right"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {vm.result.open && (
        <Modal
          title={vm.result.title}
          variant={vm.result.success ? "success" : "error"}
          onCancel={vm.result.close}
          showConfirm={false}
          showCancel={false}
          size="small"
        >
          <div className={styles.resultModalContent}>
            <p className={styles.resultModalDescription}>
              {vm.result.description}
            </p>

            <Button
              variant={vm.result.success ? "primary" : "danger"}
              onClick={vm.result.close}
            >
              Aceptar
            </Button>
          </div>
        </Modal>
      )}
    </BreadcrumbPageLayout>
  );
}