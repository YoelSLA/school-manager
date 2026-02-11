import Button from "@/components/Button";
import FilterPillGroup, {
	type Item,
} from "@/components/FilterPillGroup/FilterPillGroup";
import SidebarSectionLayout from "@/layout/SidebarSectionLayout";

type Props<T extends string> = {
	title: string;
	subtitle: string;
	filtros: Item<T>[];
	value: T;
	onChange: (value: T) => void;
	actionLabel: string;
	onAction: () => void;
};

export default function FilteredSidebar<T extends string>({
	title,
	subtitle,
	filtros,
	value,
	onChange,
	actionLabel,
	onAction,
}: Props<T>) {
	return (
		<SidebarSectionLayout
			title={title}
			subtitle={subtitle}
			filters={
				<FilterPillGroup items={filtros} value={value} onChange={onChange} />
			}
			actions={<Button onClick={onAction}>{actionLabel}</Button>}
		/>
	);
}
