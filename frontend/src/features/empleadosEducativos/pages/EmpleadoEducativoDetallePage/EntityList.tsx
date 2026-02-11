import styles from "./EntityList.module.scss";

type EntityListProps<T> = {
	title: string;
	items: T[];
	emptyText: string;
	renderItem: (item: T) => React.ReactNode;

	maxItems?: number;
	viewAllLabel?: string;
	onViewAll?: () => void;
};

export default function EntityList<T>({
	title,
	items,
	emptyText,
	renderItem,
	maxItems,
	viewAllLabel = "Ver todas",
	onViewAll,
}: EntityListProps<T>) {
	const visibleItems =
		typeof maxItems === "number" ? items.slice(0, maxItems) : items;

	const hasMore = typeof maxItems === "number" && items.length > maxItems;

	return (
		<section className={styles.entityList}>
			<header className={styles.entityList__header}>
				<h3 className={styles.entityList__title}>{title}</h3>
			</header>

			<div className={styles.entityList__content}>
				{items.length === 0 ? (
					<p className={styles.entityList__empty}>{emptyText}</p>
				) : (
					visibleItems.map(renderItem)
				)}
			</div>

			{hasMore && onViewAll && (
				<footer className={styles.entityList__footer}>
					<button
						type="button"
						className={styles.entityList__viewAll}
						onClick={onViewAll}
					>
						{viewAllLabel}
					</button>
				</footer>
			)}
		</section>
	);
}
