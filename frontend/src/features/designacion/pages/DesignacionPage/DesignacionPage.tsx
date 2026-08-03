import { useDesignacionesPage } from "../../hooks/pages/useDesignacionesPage";
import AdministrativasDesignacionesPage from "./AdministrativasDesignacionesPage";
import CursosDesignacionesPage from "./CursoDesignacionPage";

export default function DesignacionPage() {
  const vm = useDesignacionesPage();

  return vm.isAdmin ? (
    <AdministrativasDesignacionesPage vm={vm} />
  ) : (
    <CursosDesignacionesPage vm={vm} />
  );
}