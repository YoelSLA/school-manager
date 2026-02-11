import type { AsistenciaDiaDTO } from "@/features/asistencias/types/asistencias.types";
import styles from "./AsistenciaDiaRow.module.scss";

type Props = {
	asistencia: AsistenciaDiaDTO;
	selected: boolean;
	onSelect: (fecha: string) => void;
};

export default function AsistenciaDiaRow({
	asistencia,
	selected,
	onSelect,
}: Props) {
	const fecha = new Date(`${asistencia.fecha}T00:00:00`);

	const fechaLabel = fecha.toLocaleDateString("es-AR", {
		weekday: "short",
		day: "2-digit",
		month: "short",
	});

	const esPresente = asistencia.estadoAsistencia === "PRESENTE";
	const esAusente = asistencia.estadoAsistencia === "AUSENTE";

	// 👇 fuente de verdad REAL
	const esPorLicencia = asistencia.licencia !== null;
	const esManual = !esPorLicencia;

	// 👇 solo bloqueo las de licencia
	const disabled = esPorLicencia;

	return (
		<button
			type="button"
			disabled={disabled}
			className={[
				styles["dia-row"],
				esPresente && styles["dia-row--presente"],
				esAusente && styles["dia-row--ausente"],
				esAusente && esManual && styles["dia-row--manual"],
				esAusente && esPorLicencia && styles["dia-row--licencia"],
				selected && styles["dia-row--selected"],
			]
				.filter(Boolean)
				.join(" ")}
			onClick={() => onSelect(asistencia.fecha)}
		>
			<span className={styles["dia-row__fecha"]}>{fechaLabel}</span>

			<span className={styles["dia-row__estado"]}>
				{asistencia.estadoAsistencia}
			</span>

			{/* ===== BADGE ORIGEN + TIPO ===== */}

			{esAusente && esManual && (
				<span className={styles["dia-row__origen-manual"]}>
					{asistencia.tipoLicencia ?? "Manual"}
				</span>
			)}

			{esAusente && esPorLicencia && (
				<span className={styles["dia-row__origen-licencia"]}>
					{asistencia.licencia?.normativa.codigo}
				</span>
			)}
		</button>
	);
}
