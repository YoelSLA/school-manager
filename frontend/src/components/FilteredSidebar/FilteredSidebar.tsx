import type { ReactNode } from "react";
import Button from "@/components/Button";
import FilterPillGroup, {
	type Item,
} from "@/components/FilterPillGroup/FilterPillGroup";
import SidebarSectionLayout from "@/layout/SidebarSectionLayout/SidebarSectionLayout";

type Props<T extends string> = {
	title: string;
	subtitle: string;
	filtros: Item<T>[];
	value: T;
	onChange: (value: T) => void;
	actionLabel: string;
	onAction: () => void;
	controls?: ReactNode;
	extraActions?: ReactNode; // 👈 NUEVO
};

export default function FilteredSidebar<T extends string>({
	title,
	subtitle,
	filtros,
	value,
	onChange,
	actionLabel,
	onAction,
	controls,
	extraActions,
}: Props<T>) {
	return (
		<SidebarSectionLayout
			title={title}
			subtitle={subtitle}
			filters={
				<FilterPillGroup items={filtros} value={value} onChange={onChange} />
			}
			controls={controls}
			actions={
				<>
					{extraActions}
					<Button onClick={onAction}>{actionLabel}</Button>
				</>
			}
		/>
	);
}
