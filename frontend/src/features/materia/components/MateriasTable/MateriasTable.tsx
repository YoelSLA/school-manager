import type { UseQueryResult } from "@tanstack/react-query";
import ListContainer from "@/components/ListContainer";
import Table from "@/components/Table";
import type {
  PageResponse,
} from "@/shared/types";
import type { MateriaRowDTO } from "../../types";
import MateriaRow from "../MateriaRow";
import MateriasHeader from "../MateriasHeader/MateriasHeader";

type Props = {
  query: UseQueryResult<PageResponse<MateriaRowDTO>>;
  onEdit: (materia: MateriaRowDTO) => void;
  onDelete: (materia: MateriaRowDTO) => void;
};

export default function MateriasTable({
  query,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Table header={<MateriasHeader />}>
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