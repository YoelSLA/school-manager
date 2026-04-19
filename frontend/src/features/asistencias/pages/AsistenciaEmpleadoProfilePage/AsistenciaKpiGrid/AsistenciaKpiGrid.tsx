import styles from "./AsistenciaKpiGrid.module.scss";

type Props = {
	empleadoId: string;
};

export default function AsistenciaKpiGrid({ empleadoId }: Props) {
	// después vas a reemplazar esto por el hook real usando empleadoId
	console.log(empleadoId);

	const kpis = [
		{
			label: "Presentismo",
			value: "82%",
		},
		{
			label: "Total faltas",
			value: "18",
		},
		{
			label: "Última inasistencia",
			value: "12/02/2026",
		},
	];

	return (
		<section className={styles.grid}>
			{kpis.map((kpi) => (
				<article key={kpi.label} className={styles.card}>
					<span className={styles.card__label}>{kpi.label}</span>

					<h3 className={styles.card__value}>{kpi.value}</h3>
				</article>
			))}
		</section>
	);
}