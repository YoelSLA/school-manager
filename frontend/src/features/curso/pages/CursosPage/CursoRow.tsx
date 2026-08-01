import { ArrowRight } from "lucide-react";
import Row from "@/components/Table/Row";
import type { CursoRowDTO } from "@/features/cursos/types/curso.types";
import styles from "./CursoRow.module.scss";

type Props = {
  curso: CursoRowDTO;
  onVerDetalle: (curso: CursoRowDTO) => void;
};

export default function CursoRow({
  curso,
  onVerDetalle,
}: Props) {
  return (
    <Row
      className={styles.row}
      onOpen={() => onVerDetalle(curso)}
    >
      <div className={styles.anio}>
        {curso.anio}° Año
      </div>

      <div className={styles.grado}>
        {curso.grado}°
      </div>

      <div className={styles.division}>
        División {curso.division}
      </div>

      <div className={styles.turno}>
        {curso.turno}
      </div>

      <button
        type="button"
        className={styles.actions}
        onClick={(e) => {
          e.stopPropagation();
          onVerDetalle(curso);
        }}
      >
        <ArrowRight size={18} />
      </button>
    </Row>
  );
}