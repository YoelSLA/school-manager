import type { UseQueryResult } from "@tanstack/react-query";
import ListContainer from "@/components/ListContainer";
import Table from "@/components/Table";
import EmpleadoEducativoRow from "@/features/empleadosEducativos/pages/EmpleadosEducativosPage/EmpleadoEducativoRow";
import EmpleadosEducativosHeader from "@/features/empleadosEducativos/pages/EmpleadosEducativosPage/EmpleadosEducativosHeader";
import type {
  EmpleadoEducativoDetalleDTO,
  PageResponse,
} from "@/shared/types";

type Props = {
  query: UseQueryResult<PageResponse<EmpleadoEducativoDetalleDTO>>;
  onVerDetalle: (empleado: EmpleadoEducativoDetalleDTO) => void;
};

export default function EmpleadosEducativosTable({
  query,
  onVerDetalle,
}: Props) {
  return (
    <Table header={<EmpleadosEducativosHeader />}>
      <ListContainer
        isLoading={query.isLoading}
        isError={query.isError}
        items={query.data?.content ?? []}
        loadingMessage="Cargando empleados educativos…"
        emptyMessage="No hay empleados para el filtro seleccionado."
        errorMessage="Ocurrió un error al cargar los empleados."
        onRetry={() => void query.refetch()}
        getKey={(empleado) => empleado.id}
        renderItem={(empleado) => (
          <EmpleadoEducativoRow
            empleado={empleado}
            onVerDetalle={onVerDetalle}
          />
        )}
      />
    </Table>
  );
}