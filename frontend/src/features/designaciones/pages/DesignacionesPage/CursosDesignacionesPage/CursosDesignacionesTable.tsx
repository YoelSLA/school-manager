import type { UseQueryResult } from "@tanstack/react-query";
import type {
  DesignacionCursoCardDTO,
  PageResponse,
} from "@/shared/types";

import DesignacionesList from "../DesignacionesView/DesignacionesList/DesignacionesList";
import CursoDesignacionesHeader from "./CursosDesignacionesHeader";
import styles from "./CursosDesignacionesTable.module.scss";

type Props = {
  query: UseQueryResult<PageResponse<DesignacionCursoCardDTO>>;
  onVerDetalle: (d: DesignacionCursoCardDTO) => void;
};

export default function CursosDesignacionesTable({
  query,
  onVerDetalle,
}: Props) {
  return (
    <div className={styles.table}>
      <CursoDesignacionesHeader />

      <DesignacionesList
        filtro="CURSO"
        designaciones={query.data?.content ?? []}
        isLoading={query.isLoading}
        isError={query.isError}
        onVerDetalle={onVerDetalle}
      />
    </div>
  );
}