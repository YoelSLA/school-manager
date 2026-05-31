import styles from "./AsistenciaProgess.module.scss";

type Props = {
	porcentaje: number;

	presentes: number;

	ausentes: number;
};

export default function AsistenciaProgress({
	porcentaje,
	presentes,
	ausentes,
}: Props) {
	return (
		<div className={styles.progressWrapper}>
			{/* =============================================
			 * TITLE
			 * ===========================================*/}
			<span className={styles.caption}>Asistencia del mes</span>

			{/* =============================================
			 * BAR
			 * ===========================================*/}
			<div className={styles.progressBar}>
				<div
					className={styles.progressPresentes}
					style={{
						width: `${porcentaje}%`,
					}}
				/>

				<div
					className={styles.progressAusentes}
					style={{
						width: `${100 - porcentaje}%`,
					}}
				/>
			</div>

			{/* =============================================
			 * LEGEND
			 * ===========================================*/}
			<div className={styles.progressLegend}>
				<div className={styles.progressItem}>
					<div
						className={`
							${styles.progressDot}
							${styles["progressDot--presentes"]}
						`}
					/>

					<div className={styles.progressInfo}>
						<span className={styles.progressValue}>{presentes}</span>

						<span className={styles.progressLabel}>Presentes</span>
					</div>
				</div>

				<div className={styles.progressItem}>
					<div
						className={`
							${styles.progressDot}
							${styles["progressDot--ausentes"]}
						`}
					/>

					<div className={styles.progressInfo}>
						<span className={styles.progressValue}>{ausentes}</span>

						<span className={styles.progressLabel}>Ausentes</span>
					</div>
				</div>
			</div>
		</div>
	);
}
