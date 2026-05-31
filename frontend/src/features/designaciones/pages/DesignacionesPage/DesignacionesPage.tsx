import ListPageLayout from "@/app/layouts/ListPageLayout";
import Pagination from "@/app/layouts/Pagination";
import SidebarPageLayout from "@/app/layouts/SidebarPageLayout";
import { useDesignacionesPage } from "../../hooks/useDesignacionesPage";
import DesignacionesContent from "./DesignacionesContent";
import DesignacionesFilters from "./DesignacionesFilters";
import DesignacionesHeader from "./DesignacionesHeader";

export default function DesignacionesPage() {
	const vm = useDesignacionesPage();

	return (
		<SidebarPageLayout
			sidebar={
				<DesignacionesHeader
					filtro={vm.filtro}
					updateParams={vm.updateParams}
					handleRefresh={vm.handleRefresh}
					isFetching={vm.query.isFetching}
					navigation={vm.navigation}
				/>
			}
			content={
				<ListPageLayout
					filters={
						<DesignacionesFilters
							isAdmin={vm.isAdmin}
							escuelaId={vm.escuelaId}
							filters={vm.cursoFilters}
							updateParams={vm.updateParams}
						/>
					}
					content={
						<DesignacionesContent
							isAdmin={vm.isAdmin}
							adminQuery={vm.adminQuery}
							cursoQuery={vm.cursoQuery}
							onVerDetalle={vm.navigation.verDetalle}
						/>
					}
					pagination={
						<Pagination
							page={vm.page}
							totalPages={vm.totalPages}
							onChange={vm.handlePageChange}
						/>
					}
				/>
			}
		/>
	);
}
