import type { UseQueryResult } from "@tanstack/react-query";
import ListContainer from "@/shared/components/ListContainer";
import Table from "@/shared/components/Table";
import type {
  PageResponse,
} from "@/shared/types";
import type { CursoRowDTO } from "../../types";
import CursoHeader from "../CursoHeader";
import CursoRow from "../CursoRow";

type Props = {
  query: UseQueryResult<PageResponse<CursoRowDTO>>;
  onVerDetalle: (curso: CursoRowDTO) => void;
};

export default function CursoTable({
  query,
  onVerDetalle,
}: Props) {
  return (
    <Table header={<CursoHeader />}>
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
          <CursoRow
            curso={curso}
            onVerDetalle={onVerDetalle}
          />
        )}
      />
    </Table>
  );
}