import type { UseQueryResult } from "@tanstack/react-query";
import ListContainer from "@/shared/components/ListContainer";
import Table from "@/shared/components/Table";
import type { PageResponse } from "@/shared/types";
import type { EmpleadoEducativoDetalleDTO } from "../../types";
import EmpleadoEducativoHeader from "../EmpleadoEducativoHeader";
import EmpleadoEducativoRow from "../EmpleadoEducativoRow";

type Props = {
  query: UseQueryResult<PageResponse<EmpleadoEducativoDetalleDTO>>;
  onVerDetalle: (empleado: EmpleadoEducativoDetalleDTO) => void;
};

export default function EmpleadoEducativoTable({
  query,
  onVerDetalle,
}: Props) {
  return (
    <Table header={<EmpleadoEducativoHeader />}>
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