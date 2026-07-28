import PageLayout from "@/app/layouts/pages/BreadcrumbPageLayout/BreadcrumbPageLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import DesignacionAdministrativaUpdateForm from "@/features/designaciones/components/DesignacionAdministrativa/DesignacionAdministrativaUpdateForm";
import DesignacionCursoUpdateForm from "@/features/designaciones/components/DesignacionCurso/DesignacionCursoUpdateForm";
import { useDesignacionUpdatePage } from "../../hooks/pages/useDesignacionesUpdatePage";
import styles from "./DesignacionUpdatePage.module.scss";

export default function DesignacionUpdatePage() {
  const vm = useDesignacionUpdatePage();

  return (
    <PageLayout breadcrumbs={<Breadcrumbs />}>
      <section className={styles.page}>
        <div className={styles.form}>
          {vm.isLoading && <div className={styles.state}>Cargando...</div>}

          {vm.notFound && (
            <div className={styles.state}>No se encontró la designación</div>
          )}

          {vm.designacion?.tipo === "CURSO" && (
            <DesignacionCursoUpdateForm
              designacion={vm.designacion}
              onSubmit={vm.handleEditarCurso}
              isSubmitting={vm.editarCurso.isPending}
            />
          )}

          {vm.designacion?.tipo === "ADMINISTRATIVA" && (
            <DesignacionAdministrativaUpdateForm
              designacion={vm.designacion}
              onSubmit={vm.handleEditarAdministrativa}
              isSubmitting={vm.editarAdministrativa.isPending}
            />
          )}
        </div>
      </section>
    </PageLayout>
  );
}
