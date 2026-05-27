import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
	type BreadcrumbItem,
	type BreadcrumbState,
	resolveBreadcrumbs,
} from "..";
import styles from "./Breadcrumbs.module.scss";

/* =========================================================
   BREADCRUMBS
========================================================= */

/**
 * Componente global de breadcrumbs.
 *
 * Responsabilidades:
 *
 * - Resolver breadcrumbs según la ruta actual
 * - Soportar rutas dinámicas
 * - Reemplazar labels dinámicos usando location.state
 * - Agregar breadcrumbs contextuales
 * - Renderizar navegación jerárquica
 *
 * Ejemplo:
 *
 * Asistencias / Pérez, Juan / 5/2026
 */
export default function Breadcrumbs() {
	const location = useLocation();

	/**
	 * Información actual de navegación.
	 *
	 * `state` puede incluir:
	 * - labels dinámicos
	 * - breadcrumbs contextuales
	 * - flags de render
	 */
	const { pathname, search, state } = location as {
		pathname: string;
		search: string;
		state: BreadcrumbState | null;
	};

	/* =========================================================
	   BASE BREADCRUMBS
	========================================================= */

	/**
	 * Obtiene los breadcrumbs base según pathname.
	 *
	 * Ejemplo:
	 *
	 * "/asistencias/15/2026/5"
	 * =>
	 * [
	 *   { label: "Asistencias", to: "/asistencias" },
	 *   { label: "Empleado #15" },
	 *   { label: "5/2026" }
	 * ]
	 */
	const baseItems = resolveBreadcrumbs(pathname, state);

	// No hay breadcrumbs para esta ruta
	if (!baseItems || baseItems.length === 0) return null;

	let items: BreadcrumbItem[] = [...baseItems];

	/* =========================================================
	   DYNAMIC LABELS
	========================================================= */

	/**
	 * Reemplaza labels dinámicos usando IDs presentes en las rutas.
	 *
	 * Ejemplo:
	 *
	 * state.dynamicLabels = {
	 *   "15": "Pérez, Juan"
	 * }
	 *
	 * "/asistencias/15"
	 * =>
	 * "Pérez, Juan"
	 */
	if (state?.dynamicLabels) {
		items = items.map((item) => {
			// Solo se reemplazan breadcrumbs navegables
			if (!item.to) return item;

			const segments = item.to.split("/").filter(Boolean);

			for (const segment of segments) {
				const dynamicLabel = state.dynamicLabels?.[segment];

				if (dynamicLabel) {
					return {
						...item,
						label: dynamicLabel,
					};
				}
			}

			return item;
		});
	}

	/* =========================================================
	   CONTEXTUAL ITEMS
	========================================================= */

	/**
	 * Breadcrumbs adicionales enviados desde navegación.
	 *
	 * Ejemplo:
	 *
	 * {
	 *   from: "/empleados",
	 *   label: "Empleados"
	 * }
	 */
	const contextualItems: BreadcrumbItem[] =
		state?.from && state?.label ? [{ label: state.label, to: state.from }] : [];

	/**
	 * skipBase:
	 *
	 * Permite ocultar breadcrumbs base y renderizar
	 * solamente el último item junto con el contexto.
	 */
	const finalItems: BreadcrumbItem[] = state?.skipBase
		? [...contextualItems, items[items.length - 1]]
		: [...contextualItems, ...items];

	/* =========================================================
	   RENDER
	========================================================= */

	return (
		<nav className={styles.breadcrumbs} aria-label="Breadcrumb">
			{finalItems.map((item, index) => {
				const isLast = index === finalItems.length - 1;

				return (
					<span key={item.to ?? item.label} className={styles.item}>
						{/* =========================
						    LINK ITEM
						========================= */}

						{item.to && !isLast ? (
							<Link to={`${item.to}${search}`} className={styles.link}>
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
