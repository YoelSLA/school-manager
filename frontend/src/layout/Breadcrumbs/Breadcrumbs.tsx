import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { resolveBreadcrumbs } from "@/utils";
import styles from "./Breadcrumbs.module.scss";

type BreadcrumbItem = {
	label: string;
	to?: string;
};

type BreadcrumbState = {
	from?: string;
	label?: string;
	skipBase?: boolean;
	currentLabel?: string;
};

export default function Breadcrumbs() {
	const location = useLocation();

	const { pathname, state } = location as {
		pathname: string;
		state: BreadcrumbState | null;
	};

	const baseItems = resolveBreadcrumbs(pathname);
	if (!baseItems || baseItems.length === 0) return null;

	const contextualItems: BreadcrumbItem[] =
		state?.from && state?.label ? [{ label: state.label, to: state.from }] : [];

	const lastBaseItem = baseItems[baseItems.length - 1];

	const currentItem: BreadcrumbItem = state?.currentLabel
		? { label: state.currentLabel }
		: lastBaseItem;

	const finalItems: BreadcrumbItem[] = state?.skipBase
		? [...contextualItems, currentItem]
		: [...contextualItems, ...baseItems.slice(0, -1), currentItem];

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
							{" "}
							<ChevronRight className={styles.separator} />
						</span>
					)}
				</span>
			))}
		</nav>
	);
}
