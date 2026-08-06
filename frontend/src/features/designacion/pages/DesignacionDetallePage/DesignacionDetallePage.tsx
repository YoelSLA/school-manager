import { BreadcrumbPageLayout } from "@/app/layouts/pages";
import { useDesignacionDetallePage } from "../../hooks/pages";
import { DesignacionAsignacionActiva, DesignacionCargosHistorial, DesignacionDatos, DesignacionDetalleActions, DesignacionDetalleModals, DesignacionHeaderInfo, DesignacionHorarios } from "../../components";

import styles from "./DesignacionDetallePage.module.scss";

export default function DesignacionDetallePage() {
  const vm = useDesignacionDetallePage();

  if (vm.isLoading) {
    return <p>Cargando designación...</p>;
  }

  if (vm.error) {
    return <p>{vm.error}</p>;
  }

  if (!vm.designacion) {
    return <p>Designación no encontrada</p>;
  }

  return (
    <BreadcrumbPageLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <DesignacionHeaderInfo designacion={vm.designacion} />
        </div>

        <div className={styles.body}>
          <div className={styles.content}>
            <div className={styles.cargoActivo}>
              <DesignacionAsignacionActiva
                cargo={vm.cargoActivo}
                designacionId={vm.id}
                isLoading={vm.isLoadingActivo}
                onEditar={vm.setCargoAEditar}
              />
            </div>

            <div className={styles.horarios}>
              <DesignacionHorarios
                franjas={vm.designacion.franjasHorarias}
              />
            </div>

            <div className={styles.datos}>
              <DesignacionDatos designacion={vm.designacion} />
            </div>

            <div className={styles.botonesSection}>
              <DesignacionDetalleActions
                onEditar={vm.handleEditar}
                onEliminar={vm.handleEliminar}
              />
            </div>

            <div className={styles.historial}>
              <DesignacionCargosHistorial
                cargos={vm.cargos}
                isLoading={vm.isLoadingCargos}
                filtro={vm.filtroCargos}
                onChangeFiltro={vm.setFiltroCargos}
                onNuevoCargo={vm.setTipoAsignacionCrear}
              />
            </div>
          </div>
        </div>
      </div>

      <DesignacionDetalleModals
        id={vm.id}
        designacion={vm.designacion}
        cargoAEditar={vm.cargoAEditar}
        tipoAsignacionCrear={vm.tipoAsignacionCrear}
        onCloseCrear={vm.closeCrearModal}
        onCloseEditar={vm.closeEditarModal}
        onSuccess={vm.handleSuccess}
      />
    </BreadcrumbPageLayout>
  );
}