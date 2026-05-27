import { useEffect, useState } from "react";
import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import { getTodayArgentinaISO } from "@/shared/utils";
import { useDynamicPageSize } from "@/shared/utils/hooks/useDynamicPageSize";
import type { EmpleadoAsistenciaDTO } from "@/shared/utils/types";
import type { RolItem } from "../pages/AsistenciaPage/AsistenciasSidebar/AsistenciasSidebar";
import { useAsistenciaNavigation } from "./useAsistenciaNavigation";
import { useEmpleadosAsistencias } from "./useEmpleadosAsistencias";
import { useRolesConAsistencias } from "./useRolesConAsistencias";

export function useAsistenciasPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const fecha = getTodayArgentinaISO();

	const asistenciaNav = useAsistenciaNavigation();

	const pageSize = useDynamicPageSize(9, 12);

	// roles
	const {
		data: rolesData = [],
		isLoading: isLoadingRoles,
		isError: isErrorRoles,
	} = useRolesConAsistencias(escuelaActiva.id, fecha);

	const [roles, setRoles] = useState<RolItem[]>([]);

	useEffect(() => {
		if (rolesData.length === 0) return;

		setRoles(
			rolesData.map((rol) => ({
				id: rol.id,
				label: rol.label,
				count: rol.count,
				checked: true,
			})),
		);
	}, [rolesData]);

	// filtros
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(0);

	function handleToggleRol(rolId: string) {
		setRoles((prev) =>
			prev.map((rol) =>
				rol.id === rolId ? { ...rol, checked: !rol.checked } : rol,
			),
		);
	}

	function handleClearFilters() {
		setRoles((prev) =>
			prev.map((rol) => ({
				...rol,
				checked: false,
			})),
		);

		setQuery("");
		setPage(0);
	}

	const rolesActivos = roles.filter((r) => r.checked).map((r) => r.id);

	const hayRolesSeleccionados = rolesActivos.length > 0;

	// empleados
	const {
		data,
		isLoading: isLoadingEmpleados,
		isError: isErrorEmpleados,
	} = useEmpleadosAsistencias({
		escuelaId: escuelaActiva.id,
		fecha,
		roles: rolesActivos,
		query,
		page,
		size: pageSize,
		enabled: hayRolesSeleccionados,
	});

	function handleSelectEmpleado(empleado: EmpleadoAsistenciaDTO) {
		asistenciaNav.verDetalle(empleado);
	}

	return {
		roles,
		query,
		page,
		totalPages: data?.totalPages ?? 0,
		empleados: data?.content ?? [],
		isLoading: isLoadingRoles || isLoadingEmpleados,
		isError: isErrorRoles || isErrorEmpleados,
		handleToggleRol,
		handleClearFilters,
		setQuery,
		setPage,
		handleSelectEmpleado,
		hayRolesSeleccionados,
	};
}
