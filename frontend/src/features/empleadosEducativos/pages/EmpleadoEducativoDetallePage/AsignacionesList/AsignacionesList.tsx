import { useMemo, useState } from "react";
import type {
	AsignacionAdministrativaEmpleadoEducativoRowDTO,
	AsignacionCursoEmpleadoEducativoRowDTO,
	AsignacionEmpleadoEducativoRowDTO,
	Tab,
} from "@/shared/types";
import AsignacionesContent from "./AsignacionesContent";
import styles from "./AsignacionesList.module.scss";
import AsignacionesTabs from "./AsignacionesTabs";

type Props = {
	asignaciones: AsignacionEmpleadoEducativoRowDTO[];
};

export default function AsignacionesList({ asignaciones }: Props) {
	const [activeTab, setActiveTab] = useState<Tab>("DOCENTE");

	const asignacionesDocentes = useMemo(
		() =>
			asignaciones.filter(
				(asignacion): asignacion is AsignacionCursoEmpleadoEducativoRowDTO =>
					asignacion.tipo === "CURSO",
			),
		[asignaciones],
	);

	const asignacionesAdministrativas = useMemo(
		() =>
			asignaciones.filter(
				(
					asignacion,
				): asignacion is AsignacionAdministrativaEmpleadoEducativoRowDTO =>
					asignacion.tipo === "ADMINISTRATIVA",
			),
		[asignaciones],
	);

	const visibleAsignaciones =
		activeTab === "DOCENTE"
			? asignacionesDocentes
			: asignacionesAdministrativas;

	return (
		<section className={styles.asignaciones}>
			<header className={styles.header}>
				<h3 className={styles.title}>CARGOS</h3>

				<AsignacionesTabs
					activeTab={activeTab}
					onChange={setActiveTab}
					docentesCount={asignacionesDocentes.length}
					administrativosCount={asignacionesAdministrativas.length}
				/>
			</header>

			<AsignacionesContent tab={activeTab} asignaciones={visibleAsignaciones} />
		</section>
	);
}
