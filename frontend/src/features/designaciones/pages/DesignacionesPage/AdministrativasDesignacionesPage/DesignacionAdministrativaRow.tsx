import {
  BriefcaseBusiness,
  Clock3,
  MoreVertical,
  Tag,
} from "lucide-react";
import Row from "@/components/Table/Row";
import BadgeSituacionRevista from "@/shared/components/BadgeSituacionRevista/BadgeSituacionRevista";
import BadgeEstadoDesignacion from "@/shared/components/BagdeEstadoDesignacion";
import EmpleadoInfo from "@/shared/components/EmpleadoInfo";
import type { DesignacionAdministrativaRowDTO } from "@/shared/types";
import styles from "./DesignacionAdministrativaRow.module.scss";

type Props = {
  designacion: DesignacionAdministrativaRowDTO;
  onVerDetalle: (
    designacion: DesignacionAdministrativaRowDTO,
  ) => void;
  onAcciones?: (
    designacion: DesignacionAdministrativaRowDTO,
  ) => void;
};

export default function DesignacionAdministrativaRow({
  designacion,
  onVerDetalle,
  onAcciones,
}: Props) {
  const {
    cupof,
    cantidadFranjasHorarias,
    estadoDesignacion,
    rolEducativo,
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
      {/* Rol educativo */}

      <div className={styles.role}>
        <BriefcaseBusiness size={18} />
        <span>{rolEducativo}</span>
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

      {/* Empleado */}

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