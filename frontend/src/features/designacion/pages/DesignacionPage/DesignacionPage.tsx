import { useDesignacionPage } from "../../hooks/pages";
import DesignacionAdministrativaPage from "./DesignacionAdministrativaPage";
import DesignacionCursoPage from "./DesignacionCursoPage";

export default function DesignacionPage() {
	const vm = useDesignacionPage();

	return vm.isAdmin ? (
		<DesignacionAdministrativaPage vm={vm} />
	) : (
		<DesignacionCursoPage vm={vm} />
	);
}
