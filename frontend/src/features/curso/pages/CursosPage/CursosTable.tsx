import type { UseQueryResult } from "@tanstack/react-query";
import ListContainer from "@/components/ListContainer";
import Table from "@/components/Table";
import CursoRow from "@/features/cursos/pages/CursosPage/CursoRow";
import CursosHeader from "@/features/cursos/pages/CursosPage/CursosHeader";
import type { CursoRowDTO } from "@/features/cursos/types/curso.types";
import type {
  PageResponse,
} from "@/shared/types";

type Props = {
  query: UseQueryResult<PageResponse<CursoRowDTO>>;
  onVerDetalle: (curso: CursoRowDTO) => void;
};

export default function CursosTable({
  query,
  onVerDetalle,
}: Props) {
  return (
    <Table header={<CursosHeader />}>
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