import Pagination from "@/app/layouts/Pagination";
import type { useDesignacionesPage } from "@/features/designaciones/hooks/pages/useDesignacionesPage";
import CursoDesignacionesToolbar from "@/features/designaciones/pages/DesignacionesPage/CursosDesignacionesPage/CursosDesignacionesToolbar";
import DesignacionCursoFilters from "@/features/designaciones/pages/DesignacionesPage/CursosDesignacionesPage/DesignacionCursoFilters";
import DesignacionesView from "@/features/designaciones/pages/DesignacionesPage/DesignacionesView";
import styles from "./CursosDesignacionesPage.module.scss";

type Props = {
  vm: ReturnType<typeof useDesignacionesPage>;
};

export default function CursosDesignacionesPage({ vm }: Props) {
  return (
    <div className={styles.page}>
      <CursoDesignacionesToolbar
        filtro={vm.filtro}
        updateParams={vm.updateParams}
        handleRefresh={vm.handleRefresh}
        isFetching={vm.query.isFetching}
        navigation={vm.navigation}
      />

      <DesignacionCursoFilters
        escuelaId={vm.escuelaId}
        filters={vm.cursoFilters}
        updateParams={vm.updateParams}
      />

      <div className={styles.content}>
        <DesignacionesView
          isAdmin={false}
          cursoQuery={vm.cursoQuery}
          adminQuery={vm.adminQuery}
          onVerDetalle={vm.navigation.verDetalle}
        />
      </div>

      <Pagination
        page={vm.page}
        totalPages={vm.totalPages}
        onChange={vm.handlePageChange}
      />
    </div>
  );
}