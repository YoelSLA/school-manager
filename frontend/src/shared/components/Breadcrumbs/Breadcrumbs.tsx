import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.scss";
import { buildBreadcrumbItems, resolveBreadcrumbs } from "./breadcrumbHelpers";

/* =========================================================
   BREADCRUMBS
========================================================= */

/**
 * Componente global de breadcrumbs.
 *
 * Responsabilidades:
 *
 * - Obtener la información de navegación actual
 * - Resolver breadcrumbs según la ruta actual
 * - Aplicar transformaciones sobre los breadcrumbs
 * - Renderizar la navegación jerárquica
 *
 * Toda la lógica de breadcrumbs se encuentra dentro
 * del propio módulo Breadcrumbs.
 *
 * Ejemplo:
 *
 * Licencias / Rodriguez, Marcela / Crear licencia
 */
export default function Breadcrumbs() {
	const location = useLocation();

	/**
	 * Información actual de navegación.
	 *
	 * `state` puede incluir:
	 *
	 * - breadcrumbs contextuales
	 * - información dinámica
	 */
	const { pathname, search, state } = location;

	/* =========================================================
     BASE BREADCRUMBS
  ========================================================= */

	/**
	 * Obtiene los breadcrumbs base según pathname.
	 *
	 * Ejemplo:
	 *
	 * "/licencias/57"
	 * =>
	 * [
	 *   { label: "Licencias", to: "/licencias" },
	 *   { label: "Licencia #57" }
	 * ]
	 */
	const baseItems = resolveBreadcrumbs(pathname, state);

	/* =========================================================
     DEBUG RESOLUCIÓN
  ========================================================= */

	// No hay breadcrumbs para esta ruta.
	if (!baseItems.length) {
		return null;
	}

	/* =========================================================
     BREADCRUMB ITEMS
  ========================================================= */

	/**
	 * Construye los breadcrumbs finales.
	 *
	 * Puede incorporar información contextual enviada
	 * mediante el state de navegación.
	 */
	const items = buildBreadcrumbItems(baseItems, state);

	/* =========================================================
     RENDER
  ========================================================= */

	return (
		<nav className={styles.breadcrumbs} aria-label="Breadcrumb">
			{items.map((item, index) => {
				/**
				 * El último breadcrumb representa la página actual.
				 *
				 * No utilizamos el index como key.
				 */
				const isLast = index === items.length - 1;

				/**
				 * Cuando navegamos mediante un breadcrumb,
				 * conservamos solamente el recorrido hasta
				 * ese punto.
				 *
				 * Ejemplo:
				 *
				 * Empleados educativos
				 * >
				 * Aguirre, Cecilia
				 * >
				 * Crear licencia
				 *
				 * Al hacer click en "Aguirre, Cecilia":
				 *
				 * breadcrumbs:
				 * [
				 *   Empleados educativos,
				 *   Aguirre, Cecilia
				 * ]
				 */
				const navigationState = {
					breadcrumbs: items.slice(0, index + 1),
				};

				return (
					<span key={item.to ?? item.label} className={styles.item}>
						{/* =========================
						   LINK ITEM
						========================= */}

						{item.to && !isLast ? (
							<Link
								to={`${item.to}${search}`}
								state={navigationState}
								className={styles.link}
							>
								{item.label}
							</Link>
						) : (
							/* =========================
                 CURRENT ITEM
              ========================= */

							<span className={styles.current}>{item.label}</span>
						)}

						{/* =========================
						   SEPARATOR
						========================= */}

						{!isLast && (
							<span className={styles.separator}>
								<ChevronRight />
							</span>
						)}
					</span>
				);
			})}
		</nav>
	);
}
