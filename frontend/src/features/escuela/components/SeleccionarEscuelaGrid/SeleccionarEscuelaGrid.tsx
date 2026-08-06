
import type { EscuelaResponseDTO } from "../../types";
import EscuelaCard from "../EscuelaCard";
import styles from "./SeleccionarEscuelaGrid.module.scss";

type Props = {
  escuelas: EscuelaResponseDTO[];
  onEditar: (e: EscuelaResponseDTO) => void;
  onEliminar: (e: EscuelaResponseDTO) => void;
};

export default function SeleccionarEscuelaGrid({
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
          onEditar={() => onEditar(e)}
          onEliminar={() => onEliminar(e)}
        />
      ))}
    </div>
  );
}
