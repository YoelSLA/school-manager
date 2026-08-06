import { useLocation, useParams } from "react-router-dom";
import { BreadcrumbPageLayout, PageLayout } from "@/app/layouts/pages";
import { Breadcrumbs, Button } from "@/shared/components";
import type { LocationState } from "@/shared/types";
import {
  LicenciaCambiarCoberturaModal,
  LicenciaCubrirDesignacionesModal,
  LicenciaDesignacionHeader,
  LicenciaDesignacionItem,
} from "../../components";
import { useLicenciaDesignacionesPage } from "../../hooks/pages";
import { useDesignacionesAfectadas } from "../../hooks/queries";
import styles from "./LicenciasDesignacionesPage.module.scss";

export default function LicenciasDesignacionesPage() {
  const { licenciaId } = useParams();
  const location = useLocation();

  const id = licenciaId ? Number(licenciaId) : undefined;
  const state = location.state as LocationState | undefined;

  const empleado = state?.empleado;
  const licencia = state?.licencia;

  const {
    seleccionadas,
    haySeleccionadas,
    toggleDesignacion,

    designacionIds,
    cubrirModalOpen,
    cubrirSeleccionadas,
    cubrirDesignacion,
    cerrarCubrir,
    cubrirSuccess,

    coberturaSeleccionada,
    seleccionarCobertura,
    cerrarCambiarCobertura,
  } = useLicenciaDesignacionesPage();

  const {
    data: designaciones = [],
    isLoading,
    isError,
  } = useDesignacionesAfectadas(id);

  if (!id || !empleado || !licencia) {
    return (
      <PageLayout>
        <div className={styles.page}>
          <Breadcrumbs />
          <p>No se pudo cargar la información de la licencia.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <BreadcrumbPageLayout>
      <div className={styles.page}>
        <LicenciaDesignacionHeader
          empleado={empleado}
          licencia={licencia}
        />

        {isLoading ? (
          <p>Cargando...</p>
        ) : isError ? (
          <p>Error al cargar designaciones</p>
        ) : (
          <>
            <div className={styles.container}>
              {designaciones.length === 0 ? (
                <p className={styles.designacionesList__empty}>
                  No hay designaciones afectadas
                </p>
              ) : (
                <div className={styles.designacionesList}>
                  {designaciones.map((designacion) => (
                    <LicenciaDesignacionItem
                      key={designacion.designacionId}
                      designacion={designacion}
                      selected={seleccionadas.includes(
                        designacion.designacionId,
                      )}
                      onSelect={toggleDesignacion}
                      onCubrir={cubrirDesignacion}
                      onCambiarCobertura={() =>
                        seleccionarCobertura(designacion)
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            <div className={styles.actions}>
              <Button
                variant="primary"
                size="sm"
                disabled={!haySeleccionadas}
                onClick={cubrirSeleccionadas}
              >
                Cubrir seleccionadas ({seleccionadas.length})
              </Button>
            </div>
          </>
        )}
      </div>

      {cubrirModalOpen && (
        <LicenciaCubrirDesignacionesModal
          licenciaId={id}
          designacionIds={designacionIds}
          onClose={cerrarCubrir}
          onSuccess={cubrirSuccess}
        />
      )}

      {coberturaSeleccionada && (
        <LicenciaCambiarCoberturaModal
          licenciaId={id}
          designacionId={coberturaSeleccionada.designacionId}
          secuencia={coberturaSeleccionada.secuencia}
          empleadoInicial={coberturaSeleccionada.empleado}
          fechaInicial={coberturaSeleccionada.fechaTomaPosesion}
          onClose={cerrarCambiarCobertura}
          onSuccess={cerrarCambiarCobertura}
        />
      )}
    </BreadcrumbPageLayout>
  );
}