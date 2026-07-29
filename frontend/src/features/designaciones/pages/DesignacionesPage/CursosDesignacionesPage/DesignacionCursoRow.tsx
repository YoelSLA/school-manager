import {
  BookOpen,
  Clock3,
  MoreVertical,
  Tag,
} from "lucide-react";
import Row from "@/components/Table/Row";
import BadgeSituacionRevista from "@/shared/components/BadgeSituacionRevista/BadgeSituacionRevista";
import BadgeEstadoDesignacion from "@/shared/components/BagdeEstadoDesignacion";
import EmpleadoInfo from "@/shared/components/EmpleadoInfo";
import type { DesignacionCursoRowDTO } from "@/shared/types";
import styles from "./DesignacionCursoRow.module.scss";

type Props = {
  designacion: DesignacionCursoRowDTO;
  onVerDetalle: (designacion: DesignacionCursoRowDTO) => void;
  onAcciones?: (designacion: DesignacionCursoRowDTO) => void;
};

export default function DesignacionCursoRow({
  designacion,
  onVerDetalle,
  onAcciones,
}: Props) {
  const {
    cupof,
    cantidadFranjasHorarias,
    estadoDesignacion,
    nombreMateria,
    nombreCurso,
    orientacion,
    asignacionActiva,
  } = designacion;

  const empleado = asignacionActiva?.empleadoEducativo
    ? {
      ...asignacionActiva.empleadoEducativo,
      situacionDeRevista:
        asignacionActiva.situacionDeRevista,
    }
    : undefined;

  const franjasLabel =
    cantidadFranjasHorarias === 1
      ? "1 franja"
      : `${cantidadFranjasHorarias} franjas`;

  return (
    <Row
      className={styles.row}
      onOpen={() => onVerDetalle(designacion)}
    >
      {/* Materia */}

      <div className={styles.subject}>
        <BookOpen className={styles.subjectIcon} />

        <div className={styles.subjectContent}>
          <span className={styles.subjectTitle}>
            {nombreMateria}
          </span>

          <span className={styles.subjectSubtitle}>
            {nombreCurso} · {orientacion}
          </span>
        </div>
      </div>

      {/* Situación de revista */}

      <div className={styles.position}>
        {empleado ? (
          <BadgeSituacionRevista
            value={empleado.situacionDeRevista}
          />
        ) : (
          <span>-</span>
        )}
      </div>

      {/* Docente */}

      <div className={styles.employee}>
        <EmpleadoInfo empleado={empleado} />
      </div>

      {/* Estado */}

      <div className={styles.status}>
        <BadgeEstadoDesignacion
          value={estadoDesignacion}
        />
      </div>

      {/* Franjas */}

      <div className={styles.hours}>
        <Clock3 size={16} />
        <span>{franjasLabel}</span>
      </div>

      {/* CUPOF */}

      <div className={styles.cupof}>
        <Tag size={15} />
        <span>#{cupof}</span>
      </div>

      {/* Acciones */}

      <button
        type="button"
        className={styles.actions}
        onClick={(e) => {
          e.stopPropagation();
          onAcciones?.(designacion);
        }}
      >
        <MoreVertical size={18} />
      </button>
    </Row>
  );
}