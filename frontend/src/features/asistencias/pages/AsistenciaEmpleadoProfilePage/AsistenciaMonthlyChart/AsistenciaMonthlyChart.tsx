import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import styles from "./AsistenciaMonthlyChart.module.scss";

const data = [
  { mes: "Ene", faltas: 1 },
  { mes: "Feb", faltas: 5 },
  { mes: "Mar", faltas: 0 },
  { mes: "Abr", faltas: 2 },
  { mes: "May", faltas: 0 },
  { mes: "Jun", faltas: 1 },
  { mes: "Jul", faltas: 3 },
  { mes: "Ago", faltas: 0 },
  { mes: "Sep", faltas: 2 },
  { mes: "Oct", faltas: 1 },
  { mes: "Nov", faltas: 0 },
  { mes: "Dic", faltas: 3 },
];

export default function AsistenciaMonthlyChart() {
  return (
    <div className={styles.card}>
      <h3>Faltas por mes</h3>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="faltas" fill="#3B82F6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
