import type { UseQueryResult } from "@tanstack/react-query";
import ListContainer from "@/shared/components/ListContainer";
import Table from "@/shared/components/Table";
import type {
  PageResponse,
} from "@/shared/types";
import type { LicenciaRowDTO } from "../../types";
import LicenciaRow from "../LicenciaRow/LicenciaRow";
import LicenciasHeader from "../LicenciasHeader/LicenciaHeader";

type Props = {
  query: UseQueryResult<PageResponse<LicenciaRowDTO>>;
  onVerDetalle: (licenciaId: number) => void;
  onDelete: (licencia: LicenciaRowDTO) => void;
};

export default function LicenciaTable({
  query,
  onVerDetalle,
  onDelete,
}: Props) {
  return (
    <Table header={<LicenciasHeader />}>
      <ListContainer
        isLoading={query.isLoading}
        isError={query.isError}
        items={query.data?.content ?? []}
        loadingMessage="Cargando licencias…"
        emptyMessage="No hay licencias para el filtro seleccionado."
        errorMessage="Ocurrió un error al cargar las licencias."
        onRetry={() => void query.refetch()}
        getKey={(licencia) => licencia.id}
        renderItem={(licencia) => (
          <LicenciaRow
            licencia={licencia}
            onVerDetalle={() => onVerDetalle(licencia.id)}
            onDelete={() => onDelete(licencia)}
          />
        )}
      />
    </Table>
  );
}