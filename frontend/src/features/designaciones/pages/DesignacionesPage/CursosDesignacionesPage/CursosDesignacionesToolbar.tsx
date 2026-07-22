import Toolbar from "@/app/layouts/Toolbar";
import FilterPillGroup from "@/components/FilterPillGroup";
import type { useDesignacionesNavigation } from "@/features/designaciones/hooks/useDesignacionesNavigation";
import type { DesignacionFiltro } from "@/shared/types";
import { FILTROS_DESIGNACIONES } from "@/shared/utils";

type Props = {
  filtro: DesignacionFiltro;
  updateParams: (params: Record<string, string | undefined>) => void;

  handleRefresh: () => void;
  isFetching: boolean;

  navigation: ReturnType<typeof useDesignacionesNavigation>;
};

export default function CursoDesignacionesToolbar({
  filtro,
  updateParams,
  handleRefresh,
  isFetching,
  navigation,
}: Props) {
  return (
    <Toolbar
      title="Designaciones de cursos"
      filters={
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
      }
      onRefresh={handleRefresh}
      isFetching={isFetching}
      onCreate={navigation.crear}
      createLabel="Nueva designación"
    />
  );
}