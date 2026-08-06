import type { UseQueryResult } from "@tanstack/react-query";
import { ListContainer } from "@/shared/components";
import Table from "@/shared/components/Table";
import type { PageResponse } from "@/shared/types";
import type { LicenciaEstatutariaRowDTO } from "../../types";
import LicenciaEstatutariaHeader from "../LicenciaEstatutariaHeader";
import LicenciaEstatutariaRow from "../LicenciaEstatutariaRow";

type Props = {
  query: UseQueryResult<PageResponse<LicenciaEstatutariaRowDTO>>;
  onEdit: (
    licenciaEstatutaria: LicenciaEstatutariaRowDTO,
  ) => void;
  onDelete: (
    licenciaEstatutaria: LicenciaEstatutariaRowDTO,
  ) => void;
};

export default function LicenciaEstatutariaTable({
  query,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Table header={<LicenciaEstatutariaHeader />}>
      <ListContainer
        isLoading={query.isLoading}
        isError={query.isError}
        items={query.data?.content ?? []}
        loadingMessage="Cargando licencias estatutarias…"
        emptyMessage="No hay licencias estatutarias para el filtro seleccionado."
        errorMessage="Ocurrió un error al cargar las licencias estatutarias."
        onRetry={() => void query.refetch()}
        getKey={(licenciaEstatutaria) => licenciaEstatutaria.id}
        renderItem={(licenciaEstatutaria) => (
          <LicenciaEstatutariaRow
            licenciaEstatutaria={licenciaEstatutaria}
            onEdit={() => onEdit(licenciaEstatutaria)}
            onDelete={() => onDelete(licenciaEstatutaria)}
          />
        )}
      />
    </Table>
  );
}