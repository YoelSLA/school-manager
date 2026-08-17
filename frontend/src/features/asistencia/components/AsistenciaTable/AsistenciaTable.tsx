import { ListContainer } from "@/shared/components";
import Table from "@/shared/components/Table";
import type { AsistenciaEmpleadoResumenDTO } from "../../types";
import AsistenciaEmpleadoEducativoTableRow from "./AsistenciaEmpleadoEducativoTableRow";
import AsistenciaTableHeader from "./AsistenciaTableHeader";

type Props = {
	empleados: AsistenciaEmpleadoResumenDTO[];
	isLoading: boolean;
	isError: boolean;
	onSelect: (empleado: AsistenciaEmpleadoResumenDTO) => void;
};

export default function AsistenciaTable({
	empleados,
	isLoading,
	isError,
	onSelect,
}: Props) {
	return (
		<Table header={<AsistenciaTableHeader />}>
			<ListContainer
				isLoading={isLoading}
				isError={isError}
				items={empleados}
				loadingMessage="Cargando asistencias…"
				emptyMessage="No hay empleados para los filtros seleccionados."
				errorMessage="Ocurrió un error al cargar las asistencias."
				getKey={(empleado) => empleado.empleadoBasico.id}
				renderItem={(empleado) => (
					<AsistenciaEmpleadoEducativoTableRow
						asistenciaEmpleadoResumen={empleado}
						onSelect={onSelect}
					/>
				)}
			/>
		</Table>
	);
}
