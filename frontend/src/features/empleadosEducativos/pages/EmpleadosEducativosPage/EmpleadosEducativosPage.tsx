import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilteredSidebar from "@/components/FilteredSidebar/FilteredSidebar";
import SidebarPageLayout from "@/layout/SidebarPageLayout";
import { useEmpleadosEducativos } from "../../hooks/useEmpleadosEducativos";
import type {
	EmpleadoEducativoDetalleDTO,
	EmpleadoEducativoFiltro,
} from "../../types/empleadosEducativos.types";
import { FILTROS_EMPLEADOS } from "../../utils/empleadosEducativos.utils";
import EmpleadosEducativosList from "./EmpleadosEducativosList";

export default function EmpleadosEducativosPage() {
	const navigate = useNavigate();
	const [filtro, setFiltro] = useState<EmpleadoEducativoFiltro>("TODOS");

	const { data: empleados = [], isLoading } = useEmpleadosEducativos(filtro);

	const handleCrearEmpleado = () => {
		navigate("/empleadosEducativos/crear");
	};

	const handleVerDetalle = (empleado: EmpleadoEducativoDetalleDTO) => {
		navigate(`/empleadosEducativos/${empleado.id}`, {
			state: {
				currentLabel: `${empleado.apellido}, ${empleado.nombre}`,
			},
		});
	};

	return (
		<SidebarPageLayout
			sidebar={
				<FilteredSidebar
					title="Empleados educativos"
					subtitle="Listado del personal de la escuela"
					filtros={FILTROS_EMPLEADOS}
					value={filtro}
					onChange={setFiltro}
					actionLabel="+ Nuevo empleado"
					onAction={handleCrearEmpleado}
				/>
			}
		>
			<EmpleadosEducativosList
				empleados={empleados}
				isLoading={isLoading}
				onVerDetalle={handleVerDetalle}
			/>
		</SidebarPageLayout>
	);
}
