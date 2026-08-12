import type { RolEducativo } from "@/shared/types";

export type EstadoVisual = "presente" | "ausente" | null;

export type RolItem = {
	id: RolEducativo;
	label: string;
	count: number;
	checked: boolean;
};
