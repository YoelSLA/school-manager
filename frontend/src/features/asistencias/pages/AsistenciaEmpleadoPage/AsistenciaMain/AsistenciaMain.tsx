import { BadgeCheck, IdCard } from "lucide-react";

import RolPill from "@/components/RolPill";
import type {
	AsistenciaDiaDTO,
	EmpleadoAsistenciaDTO,
} from "@/features/asistencias/types/asistencias.types";
import AsistenciaDiaRow from "./AsistenciaDiaRow";
import styles from "./AsistenciaMain.module.scss";

type Props = {
	asistencias: AsistenciaDiaDTO[];
	loading: boolean;
	error: unknown;
	empleado?: EmpleadoAsistenciaDTO;

	selectedFechas: string[];
	onChangeSelectedFechas: (fechas: string[]) => void;
};

export default function AsistenciaMain({
	asistencias,
	loading,
	error,
	empleado,
	selectedFechas,
	onChangeSelectedFechas,
}: Props) {
	const toggleFecha = (fecha: string) => {
		onChangeSelectedFechas(
			selectedFechas.includes(fecha)
				? selectedFechas.filter((f) => f !== fecha)
				: [...selectedFechas, fecha],
		);
	};

	if (loading) {
		return (
			<main className={styles["asistencia-main"]}>
				<p>Cargando asistencias…</p>
			</main>
		);
	}

	if (error) {
		return (
			<main className={styles["asistencia-main"]}>
				<p>Error al cargar asistencias</p>
			</main>
		);
	}

	return (
		<main className={styles["asistencia-main"]}>
			{/* ===== HEADER ===== */}
			<header className={styles["asistencia-main__header"]}>
				{/* IZQUIERDA — CUIL */}
				<div className={styles["asistencia-main__cuil"]}>
					<IdCard size={14} />
					{empleado?.cuil}
				</div>

				{/* CENTRO — NOMBRE */}
				<div className={styles["asistencia-main__empleado"]}>
					{empleado
						? `${empleado.apellido}, ${empleado.nombre}`
						: "Cargando empleado…"}
				</div>

				{/* DERECHA — ROLES */}
				<div className={styles["asistencia-main__roles"]}>
					{empleado?.roles?.map((rol) => (
						<RolPill key={rol}>
							<BadgeCheck size={12} />
							{rol}
						</RolPill>
					))}
				</div>
			</header>

			{/* ===== CONTEXTO ===== */}
			<section className={styles["asistencia-main__context"]}>
				Solo se muestran los días con asistencia esperada
			</section>

			{/* ===== LISTA DE DÍAS (SCROLL) ===== */}
			<section className={styles["asistencia-main__dias"]}>
				{asistencias.map((asistencia) => (
					<AsistenciaDiaRow
						key={asistencia.fecha}
						asistencia={asistencia}
						selected={selectedFechas.includes(asistencia.fecha)}
						onSelect={toggleFecha}
					/>
				))}
			</section>
		</main>
	);
}
