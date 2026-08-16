import type { UseQueryResult } from "@tanstack/react-query";
import { ListContainer } from "@/shared/components";
import Table from "@/shared/components/Table";
import type { PageResponse } from "@/shared/types";
import type { DesignacionCursoRowDTO } from "../../../types";
import DesignacionCursoTableHeader from "./DesignacionCursoTableHeader";
import DesignacionCursoTableRow from "./DesignacionCursoTableRow";

type Props = {
  query: UseQueryResult<PageResponse<DesignacionCursoRowDTO>>;
  onVerDetalle: (designacion: DesignacionCursoRowDTO) => void;
};

export default function DesignacionCursoTable({
  query,
  onVerDetalle,
}: Props) {
  return (
    <Table header={<DesignacionCursoTableHeader />}>
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
          <DesignacionCursoTableRow
            designacion={designacion}
            onVerDetalle={onVerDetalle}
          />
        )}
      />
    </Table>
  );
}