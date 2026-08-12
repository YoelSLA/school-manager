import styles from "./DesignacionPageCreate.module.scss";
import { BreadcrumbPageLayout } from "@/app/layouts/pages";
import { ModalError } from "@/shared/components/Modal";
import { DesignacionAdministrativaFormCreate, DesignacionCursoFormCreate, DesignacionTabs } from "../../components/DesignacionPageCreate";
import { useDesignacionPageCreate } from "../../hooks";

export default function DesignacionPageCreate() {
  const vm = useDesignacionPageCreate();

  return (
    <BreadcrumbPageLayout>
      <section className={styles.page}>
        <div className={styles.tabs}>
          <DesignacionTabs
            value={vm.tipo}
            onChange={vm.setTipo}
          />
        </div>

        <div className={styles.form}>
          {vm.isCurso ? (
            <DesignacionCursoFormCreate
              onSubmit={vm.handleCrearCurso}
              isSubmitting={vm.crearCurso.isPending}
            />
          ) : (
            <DesignacionAdministrativaFormCreate
              onSubmit={vm.handleCrearAdministrativa}
              isSubmitting={vm.crearAdministrativa.isPending}
            />
          )}
        </div>
      </section>

      {vm.errorModal && (
        <ModalError
          error={vm.errorModal}
          onClose={vm.closeErrorModal}
        />
      )}
    </BreadcrumbPageLayout>
  );
}
