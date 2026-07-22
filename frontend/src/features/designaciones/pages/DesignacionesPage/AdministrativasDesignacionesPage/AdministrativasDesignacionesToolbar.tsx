import { RefreshCw } from "lucide-react";
import Button from "@/components/Button";
import FilterPillGroup from "@/components/FilterPillGroup";
import type { DesignacionFiltro } from "@/shared/types";
import { FILTROS_DESIGNACIONES } from "@/shared/utils";
import styles from "../DesignacionesToolar.module.scss";

type Props = {
  filtro: DesignacionFiltro;
  updateParams: (params: Record<string, string | undefined>) => void;

  handleRefresh: () => void;
  isFetching: boolean;

  navigation: {
    crear: () => void;
  };
};

export default function AdministrativasDesignacionesToolbar({
  filtro,
  updateParams,
  handleRefresh,
  isFetching,
  navigation,
}: Props) {
  return (
    <header className={styles.toolbar}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>
            Designaciones administrativas
          </h1>

          <p className={styles.subtitle}>
            Listado de cargos administrativos de la escuela.
          </p>
        </div>

        <div className={styles.actions}>
          <Button
            variant="ghost"
            leftIcon={<RefreshCw size={16} />}
            loading={isFetching}
            onClick={handleRefresh}
          >
            Actualizar
          </Button>

          <Button onClick={navigation.crear}>
            Nueva designación
          </Button>
        </div>
      </div>

      <div className={styles.bottom}>
        <FilterPillGroup
          items={FILTROS_DESIGNACIONES}
          value={filtro}
          onChange={(value) =>
            updateParams({
              tipo: value,
              page: "0",
            })
          }
        />
      </div>
    </header>
  );
}