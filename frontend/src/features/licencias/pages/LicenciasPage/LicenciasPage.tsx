import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Pagination from "@/layout/Pagination";

import SidebarPageLayout from "@/layout/SidebarPageLayout/SidebarPageLayout";
import SidebarSectionLayout from "@/layout/SidebarSectionLayout/SidebarSectionLayout";

import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";

import { useLicencias } from "../../hooks/useLicencias";
import { useLicenciasNavigation } from "../../hooks/useLicenciasNavigation";
import { useDynamicPageSize } from "@/hooks/useDynamicPageSize";

import LicenciasList from "./LicenciasList";

export default function LicenciasPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const licenciasNav = useLicenciasNavigation();

	const [page, setPage] = useState(0);
	const pageSize = useDynamicPageSize();

	// 🔥 Reset page cuando cambia pageSize
	useEffect(() => {
		setPage(0);
	}, []);

	const {
		data,
		isLoading,
		isError,
		refetch,
	} = useLicencias(escuelaActiva?.id, page, pageSize);

	const licencias = data?.content ?? [];
	const totalPages = data?.totalPages ?? 0;

	return (
		<SidebarPageLayout
			sidebar={
				<SidebarSectionLayout
					title="Licencias"
					subtitle="Gestión de licencias del personal educativo"
					actions={
						<Button onClick={licenciasNav.crear}>
							+ Nueva licencia
						</Button>
					}
				/>
			}
			pagination={
				totalPages > 1 ? (
					<Pagination
						page={page}
						totalPages={totalPages}
						onChange={setPage}
					/>
				) : undefined
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
