import type { UseQueryResult } from "@tanstack/react-query";
import { ListContainer } from "@/shared/components";
import Table from "@/shared/components/Table";
import type {
  PageResponse,
} from "@/shared/types";
import type { CursoRowDTO } from "../../types";
import CursoTableHeader from "./CursoTableHeader";
import CursoTableRow from "./CursoTableRow";

type Props = {
  query: UseQueryResult<PageResponse<CursoRowDTO>>;
  onVerDetalle: (curso: CursoRowDTO) => void;
};

export default function CursoTable({
  query,
  onVerDetalle,
}: Props) {
  return (
    <Table header={<CursoTableHeader />}>
      <ListContainer
        isLoading={query.isLoading}
        isError={query.isError}
        items={query.data?.content ?? []}
        loadingMessage="Cargando cursos…"
        emptyMessage="No hay cursos para el filtro seleccionado."
        errorMessage="Ocurrió un error al cargar los cursos."
        onRetry={() => void query.refetch()}
        getKey={(curso) => curso.id}
        renderItem={(curso) => (
          <CursoTableRow
            curso={curso}
            onVerDetalle={onVerDetalle}
          />
        )}
      />
    </Table>
  );
}