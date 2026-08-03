import styles from "./AusenciasDetalle.module.scss";

type Props = {
	ausentesPorCodigo: Record<string, number>;
};

export default function AusenciasDetalle({ ausentesPorCodigo }: Props) {
	return (
		<div className={styles.detalleBox}>
			<span className={styles.detalleTitle}>Detalle de ausencias</span>

			<ul className={styles.ausentesList}>
				{Object.entries(ausentesPorCodigo).map(([codigo, cantidad]) => (
					<li key={codigo}>
						<span>{codigo}</span>

						<strong>{cantidad}</strong>
					</li>
				))}
			</ul>
		</div>
	);
}
