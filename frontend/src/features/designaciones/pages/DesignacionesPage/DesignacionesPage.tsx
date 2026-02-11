import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import FilterPillGroup from "@/components/FilterPillGroup/FilterPillGroup";

import SidebarPageLayout from "@/layout/SidebarPageLayout";
import SidebarSectionLayout from "@/layout/SidebarSectionLayout";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import { FILTROS_DESIGNACIONES } from "@/utils";
import type { DesignacionFiltro } from "../../types/designacion.types";
import DesignacionesList from "./DesignacionesList";
import { useDesignacionesAdministrativas } from "../../hooks/useDesignacionesAdministrativas";
import { useDesignacionesCursos } from "../../hooks/useDesignacionesCursos";

export default function DesignacionesPage() {
	const navigate = useNavigate();
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const [filtro, setFiltro] = useState<DesignacionFiltro>("ADMIN");

	const {
		data: administrativas = [],
		isLoading: isLoadingAdmin,
		isError: isErrorAdmin,
	} = useDesignacionesAdministrativas(escuelaActiva?.id);

	const {
		data: cursos = [],
		isLoading: isLoadingCursos,
		isError: isErrorCursos,
	} = useDesignacionesCursos(escuelaActiva?.id);

	const _designaciones =
		filtro === "ADMIN" ? administrativas : cursos;

	const _isLoading =
		filtro === "ADMIN" ? isLoadingAdmin : isLoadingCursos;

	const _isError =
		filtro === "ADMIN" ? isErrorAdmin : isErrorCursos;

	const handleVerDetalle = (id: number) => {
		navigate(`/designaciones/${id}`);
	};

	const handleCrearDesignacion = () => {
		navigate("/designaciones/crear");
	};

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
		>
			{filtro === "ADMIN" ? (
				<DesignacionesList
					filtro="ADMIN"
					designaciones={administrativas}
					isLoading={isLoadingAdmin}
					isError={isErrorAdmin}
					onVerDetalle={handleVerDetalle}
				/>
			) : (
				<DesignacionesList
					filtro="CURSO"
					designaciones={cursos}
					isLoading={isLoadingCursos}
					isError={isErrorCursos}
					onVerDetalle={handleVerDetalle}
				/>
			)}
		</SidebarPageLayout>
	);

}
