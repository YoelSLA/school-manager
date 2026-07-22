import type { UseQueryResult } from "@tanstack/react-query";
import CursoDesignacionesTable from "@/features/designaciones/pages/DesignacionesPage/DesignacionesView/CursosDesignacionesTable";
import AdministrativasDesignacionesList from "@/features/designaciones/pages/DesignacionesPage/DesignacionesView/DesignacionesList/AdministrativasDesignacionesList";
import type {
  DesignacionAdministrativaCardDTO,
  DesignacionCursoCardDTO,
  PageResponse,
} from "@/shared/types";

type Props = {
  isAdmin: boolean;
  adminQuery: UseQueryResult<PageResponse<DesignacionAdministrativaCardDTO>>;
  cursoQuery: UseQueryResult<PageResponse<DesignacionCursoCardDTO>>;
  onVerDetalle:
  | ((designacion: DesignacionAdministrativaCardDTO) => void)
  | ((designacion: DesignacionCursoCardDTO) => void);
};

export default function DesignacionesView({
  isAdmin,
  adminQuery,
  cursoQuery,
  onVerDetalle,
}: Props) {
  if (isAdmin) {
    return (
      <AdministrativasDesignacionesList
        query={adminQuery}
        onVerDetalle={onVerDetalle as (d: DesignacionAdministrativaCardDTO) => void}
      />
    );
  }

  return (
    <CursoDesignacionesTable
      query={cursoQuery}
      onVerDetalle={
        onVerDetalle as (d: DesignacionCursoCardDTO) => void
      }
    />
  );
}