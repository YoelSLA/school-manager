import BreadcrumbPageLayout from "@/app/layouts/pages/BreadcrumbPageLayout/BreadcrumbPageLayout";
import ConfirmModal from "@/components/Modal/ModalConfirm";
import Button from "@/shared/components/Button";
import LicenciaRenovarModal from "../../components/LicenciaRenovarModal/LicenciaRenovarModal";
import useLicenciaDetallePage from "../../hooks/pages/useLicenciaDetallePage";
import styles from "./LicenciaDetallePage.module.scss";
import LicenciaHeaderStack from "./LicenciaHeaderGrid";
import LicenciaTimelineList from "./LicenciaTimelineList";

export default function LicenciaDetallePage() {
  const vm = useLicenciaDetallePage();

  if (vm.query.isLoading) {
    return <div className="page-loading">Cargando licencia…</div>;
  }

  if (vm.query.isError) {
    return (
      <div className="page-error">
        Ocurrió un error al cargar la licencia.
      </div>
    );
  }

  if (!vm.query.licencia) {
    return <div className="page-error">Licencia no encontrada.</div>;
  }

  const licencia = vm.query.licencia;

  return (
    <>
      <BreadcrumbPageLayout>
        <div className={styles.page}>
          <div className={styles.content}>
            <div className={styles.header}>
              <LicenciaHeaderStack licencia={licencia} />
            </div>

            <div className={styles.timeline}>
              {vm.timeline.isLoading && <p>Cargando timeline…</p>}

              {vm.timeline.isError && (
                <p>Error al cargar el timeline.</p>
              )}

              {!vm.timeline.isLoading && !vm.timeline.isError && (
                <LicenciaTimelineList
                  timeline={vm.timeline.data ?? []}
                  licenciaActualId={licencia.id}
                  onNavigate={vm.navigation.verDetalle}
                />
              )}
            </div>
          </div>

          <div className={styles.actionsBar}>
            <Button
              variant="secondary"
              onClick={() =>
                vm.navigation.verDesignaciones(
                  licencia.id,
                  licencia.empleado,
                  licencia,
                )
              }
            >
              Designaciones
            </Button>

            {vm.puedeRenovar && (
              <Button
                variant="primary"
                onClick={vm.renovar.open}
              >
                Renovar licencia
              </Button>
            )}

            <Button
              variant="danger"
              onClick={vm.delete.open}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </BreadcrumbPageLayout>

      {vm.renovar.visible && (
        <LicenciaRenovarModal
          licenciaId={licencia.id}
          onClose={vm.renovar.close}
          onSuccess={vm.renovar.close}
        />
      )}

      {vm.delete.visible && (
        <ConfirmModal
          open
          title="Eliminar licencia"
          description={`¿Seguro que querés eliminar la licencia ${licencia.licenciaEstatutaria.codigo}?`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={vm.delete.submit}
          onCancel={vm.delete.close}
          loading={vm.delete.isPending}
        />
      )}
    </>
  );
}