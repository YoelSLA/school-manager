import Sidebar from "@/app/layouts/Sidebar";
import FilterPillGroup from "@/components/FilterPillGroup";
import type { DesignacionFiltro } from "@/shared/types";
import { FILTROS_DESIGNACIONES } from "@/shared/utils";
import type { useDesignacionesNavigation } from "../../hooks/useDesignacionesNavigation";

type Props = {
	filtro: DesignacionFiltro;
	updateParams: (params: Record<string, string | undefined>) => void;
	handleRefresh: () => void;
	isFetching: boolean;
	navigation: ReturnType<typeof useDesignacionesNavigation>;
};

export default function DesignacionesHeader({
	filtro,
	updateParams,
	handleRefresh,
	isFetching,
	navigation,
}: Props) {
	return (
		<Sidebar
			title="Designaciones"
			subtitle="Listado de cargos de la escuela"
			filters={
				<FilterPillGroup
					items={FILTROS_DESIGNACIONES}
					value={filtro}
					onChange={(value) =>
						updateParams({
							tipo: value,
							page: "0",
						})
					}
				/>
			}
			onRefresh={handleRefresh}
			isFetching={isFetching}
			onCreate={navigation.crear}
			createLabel="Nueva designación"
		/>
	);
}
