import { BreadcrumbPageLayout } from "@/app/layouts/pages";
import DesignacionAdministrativaUpdateForm from "../../components/DesignacionAdministrativa/DesignacionAdministrativaUpdateForm";
import DesignacionCursoUpdateForm from "../../components/DesignacionCurso/DesignacionCursoUpdateForm";
import { useDesignacionUpdatePage } from "../../hooks/pages";
import styles from "./DesignacionUpdatePage.module.scss";

export default function DesignacionUpdatePage() {
  const vm = useDesignacionUpdatePage();

  return (
    <BreadcrumbPageLayout>
      <section className={styles.page}>
        <div className={styles.form}>
          {vm.isLoading && (
            <div className={styles.state}>Cargando...</div>
          )}

          {vm.notFound && (
            <div className={styles.state}>
              No se encontró la designación
            </div>
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
    </BreadcrumbPageLayout>
  );
}