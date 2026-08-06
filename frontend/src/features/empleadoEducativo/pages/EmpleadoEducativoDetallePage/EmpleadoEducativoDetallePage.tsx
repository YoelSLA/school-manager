import { BreadcrumbPageLayout } from "@/app/layouts/pages";
import { ModalConfirm } from "@/shared/components/Modal";
import { AsignacionesList, BajaDefinitivaModal, DatosPersonales, EmpleadoBottomBar, EmpleadoLicenciaSection, HeaderEmpleado } from "../../components";
import { useEmpleadoEducativoDetallePage } from "../../hooks";
import styles from "./EmpleadoEducativoDetallePage.module.scss";

export default function EmpleadoEducativoDetallePage() {
  const {
    empleado,
    asignaciones,
    licencias,
    empleadoNav,
    isLoading,
    isError,
    isBajaModalOpen,
    setIsBajaModalOpen,
    isReactivarModalOpen,
    setIsReactivarModalOpen,
    handleToggleActivo,
    confirmarBaja,
    confirmarReactivacion,
    bajaMutation,
    reactivarMutation,
  } = useEmpleadoEducativoDetallePage();

  if (isLoading) {
    return <div>Cargando empleado...</div>;
  }

  if (isError || !empleado || !asignaciones || !licencias) {
    return <div>Error al cargar el empleado</div>;
  }



  return (
    <BreadcrumbPageLayout>
      <div className={styles.page}>
        <HeaderEmpleado
          empleado={empleado}
          onEditar={() => empleadoNav.editar(empleado)}
          onToggleActivo={handleToggleActivo}
        />

        <div className={styles.main}>
          <div className={styles.left}>
            <DatosPersonales empleado={empleado} />
          </div>

          <div className={styles.right}>
            <div className={styles.panel}>
              <AsignacionesList asignaciones={asignaciones.asignaciones} />
              <EmpleadoLicenciaSection licencias={licencias} />
            </div>
          </div>
        </div>

        <EmpleadoBottomBar
          activo={empleado.activo}
          onCrearCargo={() => empleadoNav.crearCargo?.(empleado)}
          onCrearLicencia={() => empleadoNav.crearLicencia?.(empleado)}
          onEditar={() => empleadoNav.editar(empleado)}
          onToggleActivo={handleToggleActivo}
        />
      </div>

      <BajaDefinitivaModal
        isOpen={isBajaModalOpen}
        onClose={() => setIsBajaModalOpen(false)}
        onConfirm={confirmarBaja}
        isSubmitting={bajaMutation.isPending}
      />

      <ModalConfirm
        open={isReactivarModalOpen}
        title="Reactivar empleado"
        description="El empleado volverá a estar activo en el sistema."
        confirmText="Reactivar"
        cancelText="Cancelar"
        onConfirm={confirmarReactivacion}
        onCancel={() => setIsReactivarModalOpen(false)}
        loading={reactivarMutation.isPending}
      />
    </BreadcrumbPageLayout>
  );
}