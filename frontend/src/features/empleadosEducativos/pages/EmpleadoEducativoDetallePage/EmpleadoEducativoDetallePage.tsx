
import PageLayout from "@/layout/PageLayout/PageLayout";
import { useEmpleadoEducativo } from "../../hooks/useEmpleadoEducativo";
import AccionesEmpleado from "./AccionesEmpleado/AccionesEmpleado";
import AsignacionesList from "./AsignacionesList";
import DatosPersonales from "./DatosPersonales/DatosPersonales";
import styles from "./EmpleadoEducativoDetallePage.module.scss";
import HeaderEmpleado from "./HeaderEmpleado/HeaderEmpleado";
import LicenciasList from "./LicenciasList";
import { useNavigate, useParams } from "react-router-dom";
import { empleadosEducativosPaths } from "@/router/paths";

export default function EmpleadoEducativoDetallePage() {
	const { empleadoId } = useParams();
	console.log("PARAM empleadoId:", empleadoId);
	const navigate = useNavigate();

	const empleadoIdNumber = Number(empleadoId);
	console.log("ID NUM:", empleadoIdNumber);

	const {
		data: empleado,
		isLoading,
		isError,
	} = useEmpleadoEducativo(Number(empleadoId));

	console.log("DATA:", empleado);
	console.log("LOADING:", isLoading);
	console.log("ERROR:", isError);

	if (isLoading) return <div>Cargando empleado...</div>;
	if (isError || !empleado) return <div>Error al cargar el empleado</div>;

	return (
		<PageLayout>
			<div className={styles.page}>
				<HeaderEmpleado
					empleado={empleado}
					onEditar={() =>
						navigate(empleadosEducativosPaths.edit(empleado.id))
					}
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
