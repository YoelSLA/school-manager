import styles from "./UpdateModal.module.scss";

type UpdateModalProps = {
	progress: number;
	downloaded: boolean;
	onRestart: () => void;
};

export default function UpdateModal({
	progress,
	downloaded,
	onRestart,
}: UpdateModalProps) {
	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<h2 className={styles.title}>Actualización disponible</h2>

				{!downloaded ? (
					<>
						<p className={styles.description}>Descargando actualización...</p>

						<div className={styles.progressBar}>
							<div
								className={styles.progressFill}
								style={{ width: `${progress}%` }}
							/>
						</div>

						<p className={styles.percent}>{progress.toFixed(0)}%</p>
					</>
				) : (
					<>
						<p className={styles.description}>La actualización está lista.</p>

						<button className={styles.button} onClick={onRestart}>
							Reiniciar ahora
						</button>
					</>
				)}
			</div>
		</div>
	);
}
