import { useParams } from "react-router-dom";
import PageLayout from "@/layout/PageLayout/PageLayout";
import { useEmpleadoEducativo } from "../../hooks/useEmpleadoEducativo";
import AccionesEmpleado from "./AccionesEmpleado/AccionesEmpleado";
import AsignacionesList from "./AsignacionesList";
import DatosPersonales from "./DatosPersonales/DatosPersonales";
import styles from "./EmpleadoEducativoDetallePage.module.scss";
import HeaderEmpleado from "./HeaderEmpleado/HeaderEmpleado";
import LicenciasList from "./LicenciasList";

export default function EmpleadoEducativoDetallePage() {
	const { empleadoId } = useParams();

	const {
		data: empleado,
		isLoading,
		isError,
	} = useEmpleadoEducativo(Number(empleadoId));

	if (isLoading) return <div>Cargando empleado...</div>;
	if (isError || !empleado) return <div>Error al cargar el empleado</div>;

	return (
		<PageLayout>
			<div className={styles.page}>
				<HeaderEmpleado
					empleado={empleado}
					onEditar={() => console.log("Editar empleado")}
				/>

				<div className={styles.main}>
					{/* Columna izquierda: contexto */}
					<div className={styles.left}>
						<DatosPersonales empleado={empleado} />
					</div>

					{/* Columna derecha: detalles colapsables */}
					<div className={styles.right}>
						<div className={styles.panel}>
							<AsignacionesList asignaciones={empleado.asignaciones} />
							<LicenciasList licencias={empleado.licencias} />
						</div>
					</div>
				</div>

				<AccionesEmpleado empleadoId={empleado.id} />
			</div>
		</PageLayout>
	);
}
