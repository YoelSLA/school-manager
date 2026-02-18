import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { resolveBreadcrumbs } from "@/utils";
import styles from "./Breadcrumbs.module.scss";
import type { BreadcrumbItem, BreadcrumbState } from "@/utils/types";

export default function Breadcrumbs() {
	const location = useLocation();

	const { pathname, state } = location as {
		pathname: string;
		state: BreadcrumbState | null;
	};

	const baseItems = resolveBreadcrumbs(pathname);


	if (!baseItems || baseItems.length === 0) return null;

	let items: BreadcrumbItem[] = [...baseItems];

	if (state?.dynamicLabels) {

		items = items.map((item) => {
			if (!item.to) return item;

			const segments = item.to.split("/").filter(Boolean);


			for (const segment of segments) {

				if (state.dynamicLabels?.[segment]) {


					return {
						...item,
						label: state.dynamicLabels[segment],
					};
				}
			}

			return item;
		});
	} else {

	}

	const contextualItems: BreadcrumbItem[] =
		state?.from && state?.label
			? [{ label: state.label, to: state.from }]
			: [];

	const finalItems: BreadcrumbItem[] = state?.skipBase
		? [...contextualItems, items[items.length - 1]]
		: [...contextualItems, ...items];

	return (
		<nav className={styles.breadcrumbs} aria-label="Breadcrumb">
			{finalItems.map((item, index) => (
				<span key={item.to ?? item.label} className={styles.item}>
					{item.to ? (
						<Link to={item.to} className={styles.link}>
							{item.label}
						</Link>
					) : (
						<span className={styles.current}>{item.label}</span>
					)}

					{index < finalItems.length - 1 && (
						<span className={styles.separator}>
							<ChevronRight />
						</span>
					)}
				</span>
			))}
		</nav>
	);
}
