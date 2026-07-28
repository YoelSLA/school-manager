import type { UseQueryResult } from "@tanstack/react-query";
import AdministrativasDesignacionesTable from "@/features/designaciones/pages/DesignacionesPage/AdministrativasDesignacionesPage/AdministrativasDesignacionesTable/AdministrativasDesignacionesTable";
import CursosDesignacionesTable from "@/features/designaciones/pages/DesignacionesPage/CursosDesignacionesPage/CursosDesignacionesTable/CursosDesignacionesTable";
import type { DesignacionAdministrativaRowDTO, DesignacionCursoRowDTO, PageResponse } from "@/shared/types";

type Props = {
  isAdmin: boolean;
  adminQuery: UseQueryResult<PageResponse<DesignacionAdministrativaRowDTO>>;
  cursoQuery: UseQueryResult<PageResponse<DesignacionCursoRowDTO>>;
  onVerDetalle:
  | ((designacion: DesignacionAdministrativaRowDTO) => void)
  | ((designacion: DesignacionCursoRowDTO) => void);
};

export default function DesignacionesView({
  isAdmin,
  adminQuery,
  cursoQuery,
  onVerDetalle,
}: Props) {
  if (isAdmin) {
    return (
      <AdministrativasDesignacionesTable
        query={adminQuery}
        onVerDetalle={
          onVerDetalle as (d: DesignacionAdministrativaRowDTO) => void
        }
      />
    );
  }

  return (
    <CursosDesignacionesTable
      query={cursoQuery}
      onVerDetalle={
        onVerDetalle as (d: DesignacionCursoRowDTO) => void
      }
    />
  );
}