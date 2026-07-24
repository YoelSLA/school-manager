import {
  BookOpen,
  Clock3,
  MoreVertical,
  Tag,
} from "lucide-react";
import { useCargoActivo } from "@/features/asignaciones/hooks/useCargoActivo";
import BadgeSituacionRevista from "@/shared/components/BadgeSituacionRevista/BadgeSituacionRevista";
import BadgeEstadoDesignacion from "@/shared/components/BagdeEstadoDesignacion";
import EmpleadoInfo from "@/shared/components/EmpleadoInfo";
import type { DesignacionCursoCardDTO } from "@/shared/types";
import styles from "./DesignacionCursoRow.module.scss";

type Props = {
  designacion: DesignacionCursoCardDTO;
  onVerDetalle: (designacion: DesignacionCursoCardDTO) => void;
  onAcciones?: (designacion: DesignacionCursoCardDTO) => void;
};

export default function DesignacionCursoRow({
  designacion,
  onVerDetalle,
  onAcciones,
}: Props) {
  const {
    id,
    cupof,
    cantidadFranjasHorarias,
    estadoDesignacion,
    nombreMateria,
    nombreCurso,
    orientacion,
  } = designacion;

  const { cargoActivo } = useCargoActivo(id);

  const empleado = cargoActivo?.empleadoEducativoBasico
    ? {
      ...cargoActivo.empleadoEducativoBasico,
      situacionDeRevista: cargoActivo.situacionDeRevista,
    }
    : undefined;

  const franjasLabel =
    cantidadFranjasHorarias === 1
      ? "1 franja"
      : `${cantidadFranjasHorarias} franjas`;

  return (
    // biome-ignore lint/a11y/useSemanticElements: Row with nested interactive actions
    <div
      className={styles.row}
      role="button"
      tabIndex={0}
      onClick={() => onVerDetalle(designacion)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onVerDetalle(designacion);
        }
      }}
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

      {/* Cargo */}

      <div className={styles.position}>
        {empleado && (
          <BadgeSituacionRevista
            value={empleado.situacionDeRevista}
          />
        )}
      </div>

      {/* Docente */}

      <div className={styles.employee}>
        <EmpleadoInfo empleado={empleado} />
      </div>

      {/* Estado */}

      <div className={styles.status}>
        <BadgeEstadoDesignacion value={estadoDesignacion} />
      </div>

      {/* Franjas */}

      <div className={styles.hours}>
        <Clock3 size={16} />
        <span>{franjasLabel}</span>
      </div>

      {/* Cupof */}

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
    </div>
  );
}