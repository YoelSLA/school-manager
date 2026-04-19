import { useMemo, useState } from "react";
import AsignacionRow from "@/features/asignaciones/components/AsignacionRow";
import type { EmpleadoEducativoAsignacionItemDTO } from "@/utils/types";
import styles from "./AsignacionesList.module.scss";

type Props = {
	asignaciones: EmpleadoEducativoAsignacionItemDTO[];
};

type Tab = "DOCENTE" | "ADMINISTRATIVO";

export default function AsignacionesList({ asignaciones }: Props) {
	const [activeTab, setActiveTab] = useState<Tab>("DOCENTE");

	const asignacionesDocentes = useMemo(
		() => asignaciones.filter((a) => a.designacion.tipo === "CURSO"),
		[asignaciones],
	);

	const asignacionesAdministrativas = useMemo(
		() => asignaciones.filter((a) => a.designacion.tipo === "ADMINISTRATIVA"),
		[asignaciones],
	);

	const visibleAsignaciones =
		activeTab === "DOCENTE"
			? asignacionesDocentes
			: asignacionesAdministrativas;

	return (
		<section className={styles.asignaciones}>
			<header className={styles.asignaciones__header}>
				<h3 className={styles.asignaciones__title}>CARGOS</h3>

				<div className={styles.asignaciones__tabs}>
					<button
						type="button"
						className={`${styles.asignaciones__tab} ${
							activeTab === "DOCENTE" ? styles["asignaciones__tab--active"] : ""
						}`}
						onClick={() => setActiveTab("DOCENTE")}
					>
						Docentes ({asignacionesDocentes.length})
					</button>

					<button
						type="button"
						className={`${styles.asignaciones__tab} ${
							activeTab === "ADMINISTRATIVO"
								? styles["asignaciones__tab--active"]
								: ""
						}`}
						onClick={() => setActiveTab("ADMINISTRATIVO")}
					>
						Administrativos ({asignacionesAdministrativas.length})
					</button>
				</div>
			</header>

			<div className={styles.asignaciones__content}>
				{visibleAsignaciones.length === 0 ? (
					<p className={styles.asignaciones__empty}>
						{activeTab === "DOCENTE"
							? "No registra cargos docentes"
							: "No registra cargos administrativos"}
					</p>
				) : (
					visibleAsignaciones.map((asignacion) => (
						<AsignacionRow key={asignacion.id} asignacion={asignacion} />
					))
				)}
			</div>

			{/* {visibleAsignaciones.length > 0 && (
				<footer className={styles.asignaciones__footer}>
					<button
						type="button"
						className={styles.asignaciones__viewAll}
						onClick={() =>
							navigate(
								activeTab === "DOCENTE"
									? "/empleadoEducativo/123/cargos/docentes"
									: "/empleadoEducativo/123/cargos/administrativos"
							)
						}
					>
						{activeTab === "DOCENTE"
							? "Ver todos los cargos docentes"
							: "Ver todos los cargos administrativos"}
					</button>
				</footer>
			)} */}
		</section>
	);
}
