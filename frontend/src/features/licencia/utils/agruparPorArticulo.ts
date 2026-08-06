import type { TipoLicencia } from "@/shared/types";

export function agruparPorArticulo(tipos: TipoLicencia[]) {
	return tipos.reduce<Record<string, TipoLicencia[]>>((acc, tipo) => {
		const articulo = tipo.articulo ?? "Sin artículo";
		acc[articulo] ??= [];
		acc[articulo].push(tipo);
		return acc;
	}, {});
}

