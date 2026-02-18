import styles from "./AsistenciaRecentList.module.scss";

const items = [
  { id: 1, fecha: "12/02/2026", tipo: "11404" },
  { id: 2, fecha: "10/02/2026", tipo: "11404" },
  { id: 3, fecha: "06/02/2026", tipo: "11402" },
  { id: 4, fecha: "05/02/2026", tipo: "115D1" },
];

export default function AsistenciaRecentList() {
  return (
    <div className={styles.card}>
      <h3>Últimas inasistencias</h3>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            {item.fecha} — {item.tipo}
          </li>
        ))}
      </ul>
    </div>
  );
}
