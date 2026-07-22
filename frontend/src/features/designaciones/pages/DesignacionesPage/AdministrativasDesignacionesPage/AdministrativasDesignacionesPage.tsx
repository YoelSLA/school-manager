import Pagination from "@/app/layouts/Pagination";
import type { useDesignacionesPage } from "@/features/designaciones/hooks/pages/useDesignacionesPage";
import AdministrativasDesignacionesToolbar from "@/features/designaciones/pages/DesignacionesPage/AdministrativasDesignacionesPage/AdministrativasDesignacionesToolbar";

import DesignacionesView from "@/features/designaciones/pages/DesignacionesPage/DesignacionesView";

type Props = {
  vm: ReturnType<typeof useDesignacionesPage>;
};

export default function AdministrativasDesignacionesPage({ vm }: Props) {
  return (
    <>
      <AdministrativasDesignacionesToolbar
        filtro={vm.filtro}
        updateParams={vm.updateParams}
        handleRefresh={vm.handleRefresh}
        isFetching={vm.query.isFetching}
        navigation={vm.navigation}
      />

      <DesignacionesView
        isAdmin
        cursoQuery={vm.cursoQuery}
        adminQuery={vm.adminQuery}
        onVerDetalle={vm.navigation.verDetalle}
      />

      <Pagination
        page={vm.page}
        totalPages={vm.totalPages}
        onChange={vm.handlePageChange}
      />
    </>
  );
}