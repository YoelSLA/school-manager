import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

export default function DesignacionesPage() {
	const navigate = useNavigate();
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

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
	} = useDesignacionesAdministrativas(
		escuelaActiva?.id,
		page,
		pageSize,
	);

	const {
		data: cursoData,
		isLoading: isLoadingCursos,
		isError: isErrorCursos,
	} = useDesignacionesCursos(
		escuelaActiva?.id,
		page,
		pageSize,
	);

	const data = filtro === "ADMIN" ? adminData : cursoData;
	const totalPages = data?.totalPages ?? 0;

	const handleVerDetalle = (id: number) => {
		navigate(`/designaciones/${id}`);
	};

	const handleCrearDesignacion = () => {
		navigate("/designaciones/crear");
	};

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
						<Button onClick={handleCrearDesignacion}>
							+ Nueva designación
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
			{filtro === "ADMIN" ? (
				<DesignacionesList
					filtro="ADMIN"
					designaciones={adminDesignaciones}
					isLoading={isLoadingAdmin}
					isError={isErrorAdmin}
					onVerDetalle={handleVerDetalle}
				/>
			) : (
				<DesignacionesList
					filtro="CURSO"
					designaciones={cursoDesignaciones}
					isLoading={isLoadingCursos}
					isError={isErrorCursos}
					onVerDetalle={handleVerDetalle}
				/>
			)}
		</SidebarPageLayout>
	);
}
