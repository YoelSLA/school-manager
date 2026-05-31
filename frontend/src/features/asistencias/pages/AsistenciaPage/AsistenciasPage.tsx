import Pagination from "@/app/layouts/Pagination";
import { useAsistenciasPage } from "../../hooks/pages/useAsistenciasPage";
import styles from "./AsistenciasPage.module.scss";
import AsistenciasSidebar from "./AsistenciasSidebar";
import EmpleadoResultsList from "./EmpleadoResultsList";
import EmpleadoSearchBar from "./EmpleadoSearchBar";

export default function AsistenciasPage() {
	const {
		roles,
		query,
		page,
		totalPages,
		empleados,
		isLoading,
		isError,
		handleToggleRol,
		handleClearFilters,
		setQuery,
		setPage,
		handleSelectEmpleado,
		hayRolesSeleccionados,
	} = useAsistenciasPage();

	if (isLoading) {
		return <div>Cargando asistencias...</div>;
	}

	if (isError) {
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
						onSelect={handleSelectEmpleado}
					/>
				</div>

				<div className={styles.pagination}>
					<Pagination page={page} totalPages={totalPages} onChange={setPage} />
				</div>
			</main>
		</section>
	);
}
