import Button from "@/components/Button";
import SidebarPageLayout from "@/layout/SidebarPageLayout";
import SidebarSectionLayout from "@/layout/SidebarSectionLayout";

import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import { useLicencias } from "../../hooks/useLicencias";
import { useLicenciasNavigation } from "../../hooks/useLicenciasNavigation";
import LicenciasList from "./LicenciasList";

export default function LicenciasPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const licenciasNav = useLicenciasNavigation();
	const {
		data: licencias = [],
		isLoading,
		isError,
		refetch,
	} = useLicencias(escuelaActiva?.id);

	return (
		<SidebarPageLayout
			sidebar={
				<SidebarSectionLayout
					title="Licencias"
					subtitle="Gestión de licencias del personal educativo"
					actions={
						<Button onClick={licenciasNav.crear}>+ Nueva licencia</Button>
					}
				/>
			}
		>
			<LicenciasList
				licencias={licencias}
				isLoading={isLoading}
				isError={isError}
				onRetry={refetch}
				onVerDetalle={licenciasNav.verDetalle}
			/>
		</SidebarPageLayout>
	);
}
