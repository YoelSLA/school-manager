import { useEffect, useState } from "react";
import { useDynamicPageSize } from "@/hooks/useDynamicPageSize";
import Pagination from "@/layout/Pagination";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import { useAsistenciaNavigation } from "../../hooks/useAsistenciaNavigation";
import { useEmpleadosAsistencias } from "../../hooks/useEmpleadosAsistencias";
import { useRolesConAsistencias } from "../../hooks/useRolesConAsistencias";
import styles from "./AsistenciasPage.module.scss";
import AsistenciasSidebar from "./AsistenciasSidebar";
import type { RolItem } from "./AsistenciasSidebar/AsistenciasSidebar";
import EmpleadoResultsList from "./EmpleadoResultsList";
import EmpleadoSearchBar from "./EmpleadoSearchBar";

function todayISO(): string {
	return new Date().toISOString().slice(0, 10);
}

export default function AsistenciasPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const fecha = todayISO();
	const asistenciaNav = useAsistenciaNavigation();

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

	function handleToggleRol(rolId: string) {
		setRoles((prev) =>
			prev.map((rol) =>
				rol.id === rolId ? { ...rol, checked: !rol.checked } : rol,
			),
		);
	}

	const [query, setQuery] = useState("");
	const [page, setPage] = useState(0);

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

	const pageSize = useDynamicPageSize(9, 12);

	useEffect(() => {
		setPage(0);
	}, []);

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

	const empleados = data?.content ?? [];
	const totalPages = data?.totalPages ?? 0;

	if (isLoadingRoles || isLoadingEmpleados) {
		return <div>Cargando asistencias...</div>;
	}

	if (isErrorRoles || isErrorEmpleados) {
		return <div>Error al cargar asistencias</div>;
	}

	return (
		<section className={styles.page}>
			<aside className={styles.sidebar}>
				<AsistenciasSidebar
					roles={roles}
					onToggle={handleToggleRol}
					onClear={handleClearFilters}
				/>
			</aside>

			<main className={styles.content}>
				<div className={styles.search}>
					<EmpleadoSearchBar value={query} onChange={setQuery} />
				</div>

				<div className={styles.results}>
					<EmpleadoResultsList
						empleados={hayRolesSeleccionados ? empleados : []}
						onSelect={(empleado) => {
							asistenciaNav.verDetalle(empleado);
						}}
					/>
				</div>

				<div className={styles.pagination}>
					<Pagination page={page} totalPages={totalPages} onChange={setPage} />
				</div>
			</main>
		</section>
	);
}
