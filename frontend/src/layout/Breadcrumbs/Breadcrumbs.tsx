import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { resolveBreadcrumbs } from "@/utils";
import type { BreadcrumbItem, BreadcrumbState } from "@/utils/types";
import styles from "./Breadcrumbs.module.scss";

export default function Breadcrumbs() {
	const location = useLocation();

	const { pathname, search, state } = location as {
		pathname: string;
		search: string;
		state: BreadcrumbState | null;
	};

	const baseItems = resolveBreadcrumbs(pathname);

	if (!baseItems || baseItems.length === 0) return null;

	let items: BreadcrumbItem[] = [...baseItems];

	/* =========================
		 DYNAMIC LABELS
	========================= */

	if (state?.dynamicLabels) {
		items = items.map((item) => {
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

	/* =========================
		 CONTEXTUAL ITEMS
	========================= */

	const contextualItems: BreadcrumbItem[] =
		state?.from && state?.label ? [{ label: state.label, to: state.from }] : [];

	const finalItems: BreadcrumbItem[] = state?.skipBase
		? [...contextualItems, items[items.length - 1]]
		: [...contextualItems, ...items];

	/* =========================
		 RENDER
	========================= */

	return (
		<nav className={styles.breadcrumbs} aria-label="Breadcrumb">
			{finalItems.map((item, index) => {
				const isLast = index === finalItems.length - 1;
				const finalTo = item.to ? `${item.to}${search}` : null;

				return (
					<span key={item.to ?? item.label} className={styles.item}>
						{item.to && !isLast ? (
							<Link to={finalTo!} className={styles.link}>
								{item.label}
							</Link>
						) : (
							<span className={styles.current}>{item.label}</span>
						)}

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