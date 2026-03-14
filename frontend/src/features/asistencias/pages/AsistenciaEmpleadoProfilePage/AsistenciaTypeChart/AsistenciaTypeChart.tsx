import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import styles from "./AsistenciaTypeChart.module.scss";

const data = [
	{ id: 1, name: "11402", value: 6 },
	{ id: 2, name: "11404", value: 10 },
	{ id: 3, name: "115D1", value: 2 },
];

const COLORS = ["#3B82F6", "#EF4444", "#10B981"];

export default function AsistenciaTypeChart() {
	return (
		<div className={styles.card}>
			<h3>Distribución por tipo</h3>

			<ResponsiveContainer width="100%" height={250}>
				<PieChart>
					<Pie data={data} dataKey="value" outerRadius={80} label>
						{data.map((entry, index) => (
							<Cell key={entry.id} fill={COLORS[index]} />
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
