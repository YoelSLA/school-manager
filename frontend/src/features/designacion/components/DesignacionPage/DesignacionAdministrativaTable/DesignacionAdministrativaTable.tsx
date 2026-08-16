import type { UseQueryResult } from "@tanstack/react-query";
import { ListContainer } from "@/shared/components";
import Table from "@/shared/components/Table";
import type { PageResponse } from "@/shared/types";
import type { DesignacionAdministrativaRowDTO } from "../../../types";
import DesignacionAdministrativaTableHeader from "./DesignacionAdministrativaTableHeader";
import DesignacionAdministrativaTableRow from "./DesignacionAdministrativaTableRow";


type Props = {
  query: UseQueryResult<PageResponse<DesignacionAdministrativaRowDTO>>;
  onVerDetalle: (designacion: DesignacionAdministrativaRowDTO) => void;
};

export default function DesignacionAdministrativaTable({
  query,
  onVerDetalle,
}: Props) {
  return (
    <Table header={<DesignacionAdministrativaTableHeader />}>
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
          <DesignacionAdministrativaTableRow
            designacion={designacion}
            onVerDetalle={onVerDetalle}
          />
        )}
      />
    </Table>
  );
}