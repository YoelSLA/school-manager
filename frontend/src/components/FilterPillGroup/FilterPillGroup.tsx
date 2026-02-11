import Button from "@/components/Button";
import styles from "./FilterPillGroup.module.scss";

export type Item<T extends string> = {
	value: T;
	label: string;
};

type Props<T extends string> = {
	items: Item<T>[];
	value: T | undefined;
	onChange: (value: T) => void;
};

export default function FilterPillGroup<T extends string>({
	items,
	value,
	onChange,
}: Props<T>) {
	return (
		<div className={styles["filter-pill-group"]}>
			{items.map((item) => {
				const isActive = value === item.value;

				return (
					<Button
						key={item.value}
						variant="filter"
						size="sm"
						active={isActive}
						onClick={() => onChange(item.value)}
						aria-pressed={isActive}
					>
						{item.label}
					</Button>
				);
			})}
		</div>
	);
}
