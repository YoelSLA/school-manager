import type { UseQueryResult } from "@tanstack/react-query";
import ListContainer from "@/components/ListContainer";
import Table from "@/components/Table";
import DesignacionCursoRow from "@/features/designaciones/pages/DesignacionesPage/CursosDesignacionesPage/DesignacionCursoRow";
import type { DesignacionCursoRowDTO } from "@/features/designaciones/types/designacion.types";
import type { PageResponse } from "@/shared/types";
import CursoDesignacionesHeader from "./CursosDesignacionesHeader";

type Props = {
  query: UseQueryResult<PageResponse<DesignacionCursoRowDTO>>;
  onVerDetalle: (designacion: DesignacionCursoRowDTO) => void;
};

export default function CursosDesignacionesTable({
  query,
  onVerDetalle,
}: Props) {
  return (
    <Table header={<CursoDesignacionesHeader />}>
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
          <DesignacionCursoRow
            designacion={designacion}
            onVerDetalle={onVerDetalle}
          />
        )}
      />
    </Table>
  );
}