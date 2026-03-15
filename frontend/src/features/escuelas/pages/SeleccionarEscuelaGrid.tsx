import { EscuelaResponseDTO } from "@/utils/types";
import EscuelaCard from "../components/EscuelaCard/EscuelaCard";
import styles from "./SeleccionarEscuelaGrid.module.scss";

type Props = {
	escuelas: EscuelaResponseDTO[];
	onEditar: (e: EscuelaResponseDTO) => void;
	onEliminar: (e: EscuelaResponseDTO) => void;
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
