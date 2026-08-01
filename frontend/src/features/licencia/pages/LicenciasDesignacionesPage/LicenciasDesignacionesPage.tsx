import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PageLayout from "@/app/layouts/pages/BreadcrumbPageLayout/BreadcrumbPageLayout";
import type { CoberturaSeleccionada } from "@/features/asignacion/types";
import Breadcrumbs from "@/shared/components/Breadcrumbs";
import Button from "@/shared/components/Button";
import type { LocationState } from "@/shared/types";
import LicenciaCambiarCoberturaModal from "../../components/LicenciaCambiarCoberturaModal/LicenciaCambiarCoberturaModal";
import LicenciaCubrirDesignacionesModal from "../../components/LicenciaCubrirDesignacionesModal/LicenciaCubrirDesignacionesModal";
import LicenciaDesignacionItem from "../../components/LicenciaDesignacionItem";
import { useDesignacionesAfectadas } from "../../hooks/queries/useDesignacionesAfectadas";
import LicenciasDesignacionesHeader from "./LicenciasDesignacionesHeader/LicenciasDesignacionesHeader";
import styles from "./LicenciasDesignacionesPage.module.scss";

export default function LicenciasDesignacionesPage() {
  const { licenciaId } = useParams();
  const location = useLocation();

  const id = licenciaId ? Number(licenciaId) : undefined;
  const state = location.state as LocationState | undefined;

  const empleado = state?.empleado;
  const licencia = state?.licencia;

  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
  const [cubrirModalOpen, setCubrirModalOpen] = useState(false);
  const [cambiarCobertura, setCambiarCobertura] =
    useState<CoberturaSeleccionada | null>(null);

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

  function toggleDesignacion(designacionId: number) {
    setSeleccionadas((prev) =>
      prev.includes(designacionId)
        ? prev.filter((selectedId) => selectedId !== designacionId)
        : [...prev, designacionId],
    );
  }

  function handleCambiarCobertura(designacion: (typeof designaciones)[number]) {
    const asignacionActiva = designacion.cobertura;

    if (!asignacionActiva) {
      return;
    }

    setCambiarCobertura({
      designacionId: designacion.designacionId,
      secuencia: asignacionActiva.secuencia,
      empleado: asignacionActiva.empleadoEducativoBasico,
      fechaTomaPosesion: asignacionActiva.periodo.fechaDesde,
    });
  }

  function handleCubrirSuccess() {
    setSeleccionadas([]);
    setCubrirModalOpen(false);
  }

  function handleCambiarCoberturaSuccess() {
    setCambiarCobertura(null);
  }

  const haySeleccionadas = seleccionadas.length > 0;

  return (
    <PageLayout>
      <div className={styles.page}>
        <LicenciasDesignacionesHeader empleado={empleado} licencia={licencia} />

        {isLoading && <p>Cargando...</p>}

        {isError && <p>Error al cargar designaciones</p>}

        {!isLoading && !isError && (
          <section className={styles.container}>
            <div className={styles.designacionesList}>
              {designaciones.length === 0 ? (
                <p className={styles.designacionesList__empty}>
                  No hay designaciones afectadas
                </p>
              ) : (
                designaciones.map((designacion) => (
                  <LicenciaDesignacionItem
                    key={designacion.designacionId}
                    designacion={designacion}
                    selected={seleccionadas.includes(designacion.designacionId)}
                    onSelect={toggleDesignacion}
                    onCambiarCobertura={() =>
                      handleCambiarCobertura(designacion)
                    }
                  />
                ))
              )}
            </div>

            <div className={styles.actions}>
              <Button
                variant="primary"
                size="sm"
                disabled={!haySeleccionadas}
                onClick={() => setCubrirModalOpen(true)}
              >
                Cubrir seleccionadas ({seleccionadas.length})
              </Button>
            </div>
          </section>
        )}
      </div>

      {cubrirModalOpen && (
        <LicenciaCubrirDesignacionesModal
          licenciaId={id}
          designacionIds={seleccionadas}
          onClose={() => setCubrirModalOpen(false)}
          onSuccess={handleCubrirSuccess}
        />
      )}

      {cambiarCobertura && (
        <LicenciaCambiarCoberturaModal
          licenciaId={id}
          designacionId={cambiarCobertura.designacionId}
          secuencia={cambiarCobertura.secuencia}
          empleadoInicial={cambiarCobertura.empleado}
          fechaInicial={cambiarCobertura.fechaTomaPosesion}
          onClose={() => setCambiarCobertura(null)}
          onSuccess={handleCambiarCoberturaSuccess}
        />
      )}
    </PageLayout>
  );
}
