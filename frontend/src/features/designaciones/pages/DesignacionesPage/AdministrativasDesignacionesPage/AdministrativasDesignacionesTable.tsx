import type { UseQueryResult } from "@tanstack/react-query";
import ListContainer from "@/components/ListContainer";
import Table from "@/components/Table";
import AdministrativasDesignacionesHeader from "@/features/designaciones/pages/DesignacionesPage/AdministrativasDesignacionesPage/AdministrativasDesignacionesHeader";
import DesignacionAdministrativaRow from "@/features/designaciones/pages/DesignacionesPage/AdministrativasDesignacionesPage/DesignacionAdministrativaRow";
import type {
  DesignacionAdministrativaRowDTO,
  PageResponse,
} from "@/shared/types";

type Props = {
  query: UseQueryResult<PageResponse<DesignacionAdministrativaRowDTO>>;
  onVerDetalle: (designacion: DesignacionAdministrativaRowDTO) => void;
};

export default function AdministrativasDesignacionesTable({
  query,
  onVerDetalle,
}: Props) {
  return (
    <Table header={<AdministrativasDesignacionesHeader />}>
      <ListContainer
        isLoading={query.isLoading}
        isError={query.isError}
        items={query.data?.content ?? []}
        loadingMessage="Cargando designaciones…"
        emptyMessage="No hay designaciones para el filtro seleccionado."
        errorMessage="No se pudieron cargar las designaciones."
        onRetry={query.refetch}
        getKey={(designacion) => designacion.id}
        renderItem={(designacion) => (
          <DesignacionAdministrativaRow
            designacion={designacion}
            onVerDetalle={onVerDetalle}
          />
        )}
      />
    </Table>
  );
}