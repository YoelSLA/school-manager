import type { LicenciaEstatutariaSelectDTO } from "@/features/licenciaEstatutaria/types";

export function agruparPorArticulo(licencias: LicenciaEstatutariaSelectDTO[]) {
	return licencias.reduce<Record<string, LicenciaEstatutariaSelectDTO[]>>(
		(acc, licencia) => {
			const articulo = licencia.articulo || "Sin artículo";
			acc[articulo] ??= [];
			acc[articulo].push(licencia);
			return acc;
		},
		{},
	);
}
