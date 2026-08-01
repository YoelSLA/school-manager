import type { ReactNode } from "react";

export type ButtonVariant =
	| "primary"
	| "secondary"
	| "filter"
	| "success"
	| "danger"
	| "ghost";

export type ButtonSize = "sm" | "md" | "icon";

export type DropdownItem = {
	label: string;
	onClick: () => void;
	icon?: ReactNode;
	disabled?: boolean;
	danger?: boolean;
};
