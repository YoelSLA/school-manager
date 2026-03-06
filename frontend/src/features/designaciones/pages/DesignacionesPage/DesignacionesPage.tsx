import { useState, useEffect } from "react";
import Button from "@/components/Button";
import FilterPillGroup from "@/components/FilterPillGroup/FilterPillGroup";
import Pagination from "@/layout/Pagination";

import SidebarPageLayout from "@/layout/SidebarPageLayout/SidebarPageLayout";
import SidebarSectionLayout from "@/layout/SidebarSectionLayout/SidebarSectionLayout";

import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";

import { FILTROS_DESIGNACIONES } from "@/utils";
import type { DesignacionFiltro } from "../../types/designacion.types";

import DesignacionesList from "./DesignacionesList";
import { useDesignacionesAdministrativas } from "../../hooks/useDesignacionesAdministrativas";
import { useDesignacionesCursos } from "../../hooks/useDesignacionesCursos";
import { useDynamicPageSize } from "@/hooks/useDynamicPageSize";
import { useDesignacionesNavigation } from "../../hooks/useDesignacionesNavigation";
import { RefreshCw } from "lucide-react";
import styles from "./DesignacionesPage.module.scss";


export default function DesignacionesPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const navigation = useDesignacionesNavigation();

	const [filtro, setFiltro] =
		useState<DesignacionFiltro>("ADMIN");

	const [page, setPage] = useState(0);
	const pageSize = useDynamicPageSize();

	useEffect(() => {
		setPage(0);
	}, []);

	const {
		data: adminData,
		isLoading: isLoadingAdmin,
		isError: isErrorAdmin,
		refetch: refetchAdmin,
		isFetching: isFetchingAdmin,
	} = useDesignacionesAdministrativas(
		escuelaActiva?.id,
		page,
		pageSize,
	);

	const {
		data: cursoData,
		isLoading: isLoadingCursos,
		isError: isErrorCursos,
		refetch: refetchCursos,
		isFetching: isFetchingCursos,
	} = useDesignacionesCursos(
		escuelaActiva?.id,
		page,
		pageSize,
	);

	const handleRefresh = () => {
		setPage(0);

		if (filtro === "ADMIN") {
			refetchAdmin();
		} else {
			refetchCursos();
		}
	};

	const isFetching =
		filtro === "ADMIN"
			? isFetchingAdmin
			: isFetchingCursos;

	const data = filtro === "ADMIN" ? adminData : cursoData;
	const totalPages = data?.totalPages ?? 0;

	const adminDesignaciones = adminData?.content ?? [];
	const cursoDesignaciones = cursoData?.content ?? [];

	return (
		<SidebarPageLayout
			sidebar={
				<SidebarSectionLayout
					title="Designaciones"
					subtitle="Listado de cargos de la escuela"
					filters={
						<FilterPillGroup
							items={FILTROS_DESIGNACIONES}
							value={filtro}
							onChange={setFiltro}
						/>
					}
					actions={
						<>
							<Button
								variant="secondary"
								onClick={handleRefresh}
								disabled={isFetching}
							>
								<span className={styles.refreshContent}>
									<RefreshCw
										size={16}
										className={isFetching ? styles.spin : ""}
									/>
									<span>Actualizar</span>
								</span>
							</Button>

							<Button onClick={navigation.crear}>
								+ Nueva designación
							</Button>
						</>
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
			{filtro === "ADMIN" ? (
				<DesignacionesList
					filtro="ADMIN"
					designaciones={adminDesignaciones}
					isLoading={isLoadingAdmin}
					isError={isErrorAdmin}
					onVerDetalle={navigation.verDetalle}
				/>
			) : (
				<DesignacionesList
					filtro="CURSO"
					designaciones={cursoDesignaciones}
					isLoading={isLoadingCursos}
					isError={isErrorCursos}
					onVerDetalle={navigation.verDetalle}
				/>
			)}
		</SidebarPageLayout>
	);
}