import { ToolbarPageLayout } from "@/app/layouts/pages";
import { Toolbar } from "@/shared/components";
import {
	ActiveFilters,
	FilterMenu,
	FilterPillGroup,
} from "@/shared/components/Filter";
import { DesignacionAdministrativaTable } from "../../../components/DesignacionPage";
import { FILTROS_DESIGNACIONES } from "../../../constants";
import type { useDesignacionPage } from "../../../hooks/pages";

type Props = {
	vm: ReturnType<typeof useDesignacionPage>;
};

export default function DesignacionAdministrativaPage({ vm }: Props) {
	return (
		<ToolbarPageLayout
			toolbar={
				<Toolbar
					title="Designaciones administrativas"
					headerCenter={
						<FilterPillGroup
							items={FILTROS_DESIGNACIONES}
							value={vm.filtro}
							onChange={(value) =>
								vm.updateParams({
									tipo: value,
									page: "0",
								})
							}
						/>
					}
					headerActions={
						<FilterMenu activeCount={0}>
							<p>No hay filtros disponibles.</p>
						</FilterMenu>
					}
					footer={<ActiveFilters filters={[]} />}
					onRefresh={vm.handleRefresh}
					isFetching={vm.adminQuery.isFetching}
					onCreate={vm.navigation.crear}
					createLabel="Nueva designación"
				/>
			}
			page={vm.page}
			totalPages={vm.totalPages}
			onPageChange={vm.handlePageChange}
		>
			<DesignacionAdministrativaTable
				query={vm.adminQuery}
				onVerDetalle={vm.navigation.verDetalle}
			/>
		</ToolbarPageLayout>
	);
}
