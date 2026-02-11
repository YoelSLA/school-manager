import EscuelaCard from "../components/EscuelaCard/EscuelaCard";
import type { Escuela } from "../types/escuela.types";
import styles from "./SeleccionarEscuelaGrid.module.scss";

type Props = {
	escuelas: Escuela[];
	onEditar: (e: Escuela) => void;
	onEliminar: (e: Escuela) => void;
};

export function SeleccionarEscuelaGrid({
	escuelas,
	onEditar,
	onEliminar,
}: Props) {
	return (
		<div className={styles.grid}>
			{escuelas.map((e) => (
				<EscuelaCard
					key={e.id}
					escuela={e}
					onEntrar={() =>
						localStorage.setItem("escuelaActiva", e.id.toString())
					}
					onEditar={() => onEditar(e)}
					onEliminar={() => onEliminar(e)}
				/>
			))}
		</div>
	);
}
