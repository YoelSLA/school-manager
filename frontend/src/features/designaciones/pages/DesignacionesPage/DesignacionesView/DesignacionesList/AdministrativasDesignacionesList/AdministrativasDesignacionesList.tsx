import type { UseQueryResult } from "@tanstack/react-query";
import DesignacionesList from "@/features/designaciones/pages/DesignacionesPage/DesignacionesView/DesignacionesList/DesignacionesList";
import type { DesignacionAdministrativaCardDTO, PageResponse } from "@/shared/types";

type Props = {
  query: UseQueryResult<PageResponse<DesignacionAdministrativaCardDTO>>;
  onVerDetalle: (d: DesignacionAdministrativaCardDTO) => void;
};

export default function AdministrativasDesignacionesList({
  query,
  onVerDetalle,
}: Props) {
  return (
    <DesignacionesList
      filtro="ADMIN"
      designaciones={query.data?.content ?? []}
      isLoading={query.isLoading}
      isError={query.isError}
      onVerDetalle={onVerDetalle}
    />
  );
}