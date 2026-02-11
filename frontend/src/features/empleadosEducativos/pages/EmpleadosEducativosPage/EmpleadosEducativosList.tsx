import ListState from "@/components/ListState";
import ScrollableGridListLayout from "@/layout/ScrollableGridListLayout";
import EmpleadoEducativoCard from "../../components/EmpleadoEducativoCard";
import type { EmpleadoEducativoDetalleDTO } from "../../types/empleadosEducativos.types";

type Props = {
	empleados: EmpleadoEducativoDetalleDTO[];
	isLoading: boolean;
	onVerDetalle: (empleado: EmpleadoEducativoDetalleDTO) => void;
};

export default function EmpleadosEducativosList({
	empleados,
	isLoading,
	onVerDetalle,
}: Props) {
	if (isLoading) {
		return <ListState>Cargando empleados educativos…</ListState>;
	}

	if (empleados.length === 0) {
		return <ListState>No hay empleados para el filtro seleccionado.</ListState>;
	}

	return (
		<ScrollableGridListLayout>
			{empleados.map((empleado) => (
				<EmpleadoEducativoCard
					key={empleado.id}
					empleado={empleado}
					onVerDetalle={onVerDetalle}
				/>
			))}
		</ScrollableGridListLayout>
	);
}
