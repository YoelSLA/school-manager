import { useEffect, useState } from "react";
import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import type { AsistenciaEmpleadoResumenDTO } from "@/shared/types";
import { getTodayArgentinaISO } from "@/shared/utils";
import { useDynamicPageSize } from "@/shared/utils/hooks/useDynamicPageSize";
import type { RolItem } from "../../pages/AsistenciaPage/AsistenciasSidebar/AsistenciasSidebar";
import { useEmpleadosAsistencias } from "../reactQuery/useEmpleadosAsistencias";
import { useRolesConAsistencias } from "../reactQuery/useRolesConAsistencias";
import { useAsistenciasNavigation } from "../useAsistenciasNavigation";
export function useAsistenciasPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	if (!escuelaActiva) {
		throw new Error("No hay escuela activa seleccionada");
	}

	const fecha = getTodayArgentinaISO();

	const asistenciaNav = useAsistenciasNavigation();

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

	function handleSelectEmpleado(empleado: AsistenciaEmpleadoResumenDTO) {
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
