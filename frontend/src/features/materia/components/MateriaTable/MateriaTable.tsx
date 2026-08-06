import type { UseQueryResult } from "@tanstack/react-query";
import { ListContainer, Table } from "@/shared/components";
import type {
  PageResponse,
} from "@/shared/types";
import type { MateriaRowDTO } from "../../types";
import MateriaHeader from "../MateriaHeader";
import MateriaRow from "../MateriaRow";

type Props = {
  query: UseQueryResult<PageResponse<MateriaRowDTO>>;
  onEdit: (materia: MateriaRowDTO) => void;
  onDelete: (materia: MateriaRowDTO) => void;
};

export default function MateriaTable({
  query,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Table header={<MateriaHeader />}>
      <ListContainer
        isLoading={query.isLoading}
        isError={query.isError}
        items={query.data?.content ?? []}
        loadingMessage="Cargando materias…"
        emptyMessage="No hay materias para el filtro seleccionado."
        errorMessage="Ocurrió un error al cargar las materias."
        onRetry={() => void query.refetch()}
        getKey={(materia) => materia.id}
        renderItem={(materia) => (
          <MateriaRow
            materia={materia}
            onEdit={() => onEdit(materia)}
            onDelete={() => onDelete(materia)}
          />
        )}
      />
    </Table>
  );
}