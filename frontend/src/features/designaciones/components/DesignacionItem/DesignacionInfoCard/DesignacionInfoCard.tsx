import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Hash,
} from "lucide-react";
import Button from "@/components/Button";
import BadgeEstadoDesignacion from "@/components/BagdeEstadoDesignacion";
import type { LicenciaDesignacionDTO } from "@/utils/types";
import styles from "./DesignacionInfoCard.module.scss";

type Props = {
  designacion: LicenciaDesignacionDTO;
};

export default function DesignacionInfoCard({ designacion }: Props) {

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.role}>
          <Briefcase size={16} color="#2563eb" />
          <span>{designacion.rolEducativo}</span>
        </div>
        <BadgeEstadoDesignacion value={designacion.estado} />
      </div>

      <div className={styles.cupof}>
        <Hash size={14} color="#94a3b8" />
        <span>#{designacion.cupof}</span>
      </div>

      {designacion.tipo === "CURSO" && (
        <div className={styles.academico}>
          <div>
            <BookOpen size={14} color="#7c3aed" />
            <span>
              {designacion.curso} · {designacion.materia}
            </span>
          </div>

          <div>
            <GraduationCap size={14} color="#059669" />
            <span>{designacion.orientacion}</span>
          </div>
        </div>
      )}

      {designacion.tipo === "ADMINISTRATIVA" && (
        <div className={styles.academico}>
          <div>
            <Briefcase size={14} color="#64748b" />
            <span>Designación administrativa</span>
          </div>
        </div>
      )}

      <div className={styles.actions}>
        <Button
          variant="secondary"
          size="sm"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          Ver designación
        </Button>
      </div>
    </div>
  );
}