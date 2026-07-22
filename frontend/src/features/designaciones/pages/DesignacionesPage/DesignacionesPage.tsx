import Page from "@/app/layouts/Page";
import CursosDesignacionesPage from "@/features/designaciones/pages/DesignacionesPage/CursosDesignacionesPage";
import { useDesignacionesPage } from "../../hooks/pages/useDesignacionesPage";
import AdministrativasDesignacionesPage from "./AdministrativasDesignacionesPage";

export default function DesignacionesPage() {
  const vm = useDesignacionesPage();

  return (
    <Page>
      {vm.isAdmin ? (
        <AdministrativasDesignacionesPage vm={vm} />
      ) : (
        <CursosDesignacionesPage vm={vm} />
      )}
    </Page>
  );
}