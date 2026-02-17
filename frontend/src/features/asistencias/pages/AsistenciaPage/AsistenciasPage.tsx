import { useEffect, useState } from "react";
import "./AsistenciaPage.css";

import { useEmpleadosAsistencias } from "../../hooks/useEmpleadosAsistencias";
import { useRolesConAsistencias } from "../../hooks/useRolesConAsistencias";
import AsistenciasSidebar from "./AsistenciasSidebar";
import type { RolItem } from "./AsistenciasSidebar/AsistenciasSidebar";
import EmpleadoResultsList from "./EmpleadoResultsList";
import EmpleadoSearchBar from "./EmpleadoSearchBar";
import { useAsistenciaNavigation } from "../../hooks/useAsistenciaNavigation";

/* =========================
	 HELPERS
========================= */

function todayISO(): string {
	return new Date().toISOString().slice(0, 10);
}

/* =========================
	 COMPONENTE
========================= */

export default function AsistenciasPage() {
	const fecha = todayISO();
	const asistenciaNav = useAsistenciaNavigation();

	/* =========================
		 ROLES (SIDEBAR)
	========================= */

	const {
		data: rolesData = [],
		isLoading: isLoadingRoles,
		isError: isErrorRoles,
	} = useRolesConAsistencias(fecha);

	const [roles, setRoles] = useState<RolItem[]>([]);

	useEffect(() => {
		if (rolesData.length === 0) return;

		setRoles(
			rolesData.map((rol) => ({
				id: rol.id,
				label: rol.label,
				count: rol.count,
				checked: true, // todos activos por defecto
			})),
		);
	}, [rolesData]);

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
	}

	const rolesActivos = roles.filter((r) => r.checked).map((r) => r.id);

	const hayRolesSeleccionados = rolesActivos.length > 0;

	/* =========================
		 BUSQUEDA + EMPLEADOS
	========================= */

	const [query, setQuery] = useState("");

	const {
		data: empleados = [],
		isLoading: isLoadingEmpleados,
		isError: isErrorEmpleados,
	} = useEmpleadosAsistencias({
		fecha,
		roles: rolesActivos,
		query,
		enabled: hayRolesSeleccionados,
	});

	/* =========================
		 ESTADOS
	========================= */

	if (isLoadingRoles || isLoadingEmpleados) {
		return <div>Cargando asistencias...</div>;
	}

	if (isErrorRoles || isErrorEmpleados) {
		return <div>Error al cargar asistencias</div>;
	}

	/* =========================
		 RENDER
	========================= */

	return (
		<section className="asistencias-page">
			{/* SIDEBAR */}
			<aside className="asistencias-page__sidebar">
				<AsistenciasSidebar
					roles={roles}
					onToggle={handleToggleRol}
					onClear={handleClearFilters}
				/>
			</aside>

			{/* CONTENIDO */}
			<main className="asistencias-page__content">
				{/* BUSCADOR */}
				<div className="asistencias-page__search">
					<EmpleadoSearchBar value={query} onChange={setQuery} />
				</div>

				{/* LISTA */}
				<EmpleadoResultsList
					empleados={hayRolesSeleccionados ? empleados : []}
					onSelect={(empleado) => {
						asistenciaNav.verDetalle(empleado);
					}}
				/>
			</main>
		</section>
	);
}
