import Button from "@/components/Button";
import FilterPillGroup, {
	type Item,
} from "@/components/FilterPillGroup/FilterPillGroup";
import SidebarSectionLayout from "@/layout/SidebarSectionLayout/SidebarSectionLayout";
import type { ReactNode } from "react";

type Props<T extends string> = {
	title: string;
	subtitle: string;
	filtros: Item<T>[];
	value: T;
	onChange: (value: T) => void;
	actionLabel: string;
	onAction: () => void;
	controls?: ReactNode;
};

export default function FilteredSidebar<T extends string>({
	title,
	subtitle,
	filtros,
	value,
	onChange,
	actionLabel,
	onAction,
	controls
}: Props<T>) {
	return (
		<SidebarSectionLayout
			title={title}
			subtitle={subtitle}
			filters={<FilterPillGroup
				items={filtros}
				value={value}
				onChange={onChange}
			/>}
			actions={<Button onClick={onAction}>{actionLabel}</Button>}
			controls={controls}
		/>
	);
}

