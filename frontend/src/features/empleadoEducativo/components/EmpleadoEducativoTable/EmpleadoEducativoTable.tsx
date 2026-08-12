import type { UseQueryResult } from "@tanstack/react-query";
import { ListContainer } from "@/shared/components";
import Table from "@/shared/components/Table";
import type { PageResponse } from "@/shared/types";
import type { EmpleadoEducativoDetalleDTO } from "../../types";
import EmpleadoEducativoTableHeader from "./EmpleadoEducativoTableHeader";
import EmpleadoEducativoTableRow from "./EmpleadoEducativoTableRow";

type Props = {
  query: UseQueryResult<PageResponse<EmpleadoEducativoDetalleDTO>>;
  onVerDetalle: (empleado: EmpleadoEducativoDetalleDTO) => void;
};

export default function EmpleadoEducativoTable({
  query,
  onVerDetalle,
}: Props) {
  return (
    <Table header={<EmpleadoEducativoTableHeader />}>
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
          <EmpleadoEducativoTableRow
            empleado={empleado}
            onVerDetalle={onVerDetalle}
          />
        )}
      />
    </Table>
  );
}