import type { UseQueryResult } from "@tanstack/react-query";
import ListContainer from "@/shared/components/ListContainer";
import Table from "@/shared/components/Table";
import type { PageResponse } from "@/shared/types";
import type { DesignacionAdministrativaRowDTO } from "../../../types";
import DesignacionAdministrativaHeader from "../../DesignacionHeader/DesignacionAdministrativaHeader";
import DesignacionAdministrativaRow from "../../DesignacionRow/DesignacionAdministrativaRow/DesignacionAdministrativaRow";


type Props = {
  query: UseQueryResult<PageResponse<DesignacionAdministrativaRowDTO>>;
  onVerDetalle: (designacion: DesignacionAdministrativaRowDTO) => void;
};

export default function DesignacionAdministrativaTable({
  query,
  onVerDetalle,
}: Props) {
  return (
    <Table header={<DesignacionAdministrativaHeader />}>
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