// import styles from "./AsistenciaRecentList.module.scss";

// type Props = {
// 	empleadoId: string;
// };

// const items = [
// 	{ id: 1, fecha: "12/02/2026", tipo: "Justificada" },
// 	{ id: 2, fecha: "10/02/2026", tipo: "11404" },
// 	{ id: 3, fecha: "06/02/2026", tipo: "11402" },
// 	{ id: 4, fecha: "05/02/2026", tipo: "115D1" },
// ];

// export default function AsistenciaRecentList({ empleadoId }: Props) {
// 	// TODO: reemplazar por hook real usando empleadoId

// 	return (
// 		<section className={styles.card}>
// 			<div className={styles.card__header}>
// 				<h3 className={styles.card__title}>Últimas inasistencias</h3>

// 				<button type="button" className={styles.card__link}>
// 					Ver todas
// 				</button>
// 			</div>

// 			<ul className={styles.list}>
// 				{items.map((item) => (
// 					<li key={item.id} className={styles.item}>
// 						<div className={styles.item__left}>
// 							<span className={styles.item__date}>{item.fecha}</span>
// 							<span className={styles.item__type}>{item.tipo}</span>
// 						</div>

// 						<button type="button" className={styles.item__button}>
// 							Ver
// 						</button>
// 					</li>
// 				))}
// 			</ul>
// 		</section>
// 	);
// }
export default function AsistenciaRecentList() {
	return (
		<section>
			<h3>Últimas inasistencias</h3>
			<p>Aún no hay inasistencias registradas para este empleado.</p>
		</section>
	);
}
