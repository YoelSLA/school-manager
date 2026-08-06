import type { LucideIcon } from "lucide-react";
import type { BadgeVariant } from "@/shared/components/Badge/Badge.types";

export type BadgeConfig = {
	label: string;
	variant: BadgeVariant;
	icon?: LucideIcon;
};

export type SortDirection = "asc" | "desc";

export type SortState = {
	nombre?: SortDirection;
	apellido?: SortDirection;
	fechaDeIngreso?: SortDirection;
};
