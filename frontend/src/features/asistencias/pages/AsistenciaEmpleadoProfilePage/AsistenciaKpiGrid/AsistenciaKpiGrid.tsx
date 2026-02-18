import styles from "./AsistenciaKpiGrid.module.scss";

const kpis = [
  { label: "% Presentismo", value: "82%" },
  { label: "Total faltas", value: "18" },
  { label: "Justificadas", value: "10" },
  { label: "Injustificadas", value: "8" },
];

export default function AsistenciaKpiGrid() {
  return (
    <div className={styles.grid}>
      {kpis.map((kpi) => (
        <div key={kpi.label} className={styles.card}>
          <span>{kpi.label}</span>
          <h3>{kpi.value}</h3>
        </div>
      ))}
    </div>
  );
}
