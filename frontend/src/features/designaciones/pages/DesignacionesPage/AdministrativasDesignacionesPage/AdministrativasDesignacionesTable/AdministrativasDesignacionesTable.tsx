import type { UseQueryResult } from "@tanstack/react-query";
import AdministrativasDesignacionesHeader from "@/features/designaciones/pages/DesignacionesPage/AdministrativasDesignacionesPage/AdministrativasDesignacionesTable/AdministrativasDesignacionesHeader";
import type {
  DesignacionAdministrativaRowDTO,
  PageResponse,
} from "@/shared/types";
import DesignacionesList from "../../DesignacionesView/DesignacionesList/DesignacionesList";
import styles from "./AdministrativasDesignacionesTable.module.scss";

type Props = {
  query: UseQueryResult<PageResponse<DesignacionAdministrativaRowDTO>>;
  onVerDetalle: (d: DesignacionAdministrativaRowDTO) => void;
};

export default function AdministrativasDesignacionesTable({
  query,
  onVerDetalle,
}: Props) {
  return (
    <div className={styles.table}>
      <AdministrativasDesignacionesHeader />

      <DesignacionesList
        filtro="ADMIN"
        designaciones={query.data?.content ?? []}
        isLoading={query.isLoading}
        isError={query.isError}
        onVerDetalle={onVerDetalle}
      />
    </div>
  );
}