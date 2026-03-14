import type { AsignacionDetalleDTO } from "@/features/asignaciones/types/asignacion.types";
import { User } from "lucide-react";

import styles from "./CargoCard.module.scss";
import { ESTADO_ASIGNACION_BADGE } from "@/features/asignaciones/utils/asignacion.badges";
import Badge from "@/components/Badge";
import SituacionRevistaBadge from "@/components/SituacionRevistaBadge/SituacionRevistaBadge";
import PeriodoCargo from "../PeriodoCargo";
import CargoCardMenu from "../CargoCardMenu";

type Props = {
  cargo: AsignacionDetalleDTO;
  onEditar?: (cargo: AsignacionDetalleDTO) => void;
};

export default function CargoCard({ cargo, onEditar }: Props) {
  const { empleado, periodo, situacionDeRevista, estadoAsignacion } = cargo;

  const esTitular = situacionDeRevista === "Titular";

  return (
    <div className={styles.card}>

      {esTitular && (
        <CargoCardMenu onEditar={() => onEditar?.(cargo)} />
      )}

      {/* EMPLEADO */}
      <div className={styles.row}>
        <User size={16} />
        <div>
          <div className={styles.name}>
            {empleado.apellido}, {empleado.nombre}
          </div>
          <div className={styles.subtle}>
            {empleado.cuil}
          </div>
        </div>
      </div>

      {/* PERIODO */}
      <PeriodoCargo periodo={periodo} />

      {/* BADGES */}
      <div className={styles.badges}>
        <SituacionRevistaBadge value={situacionDeRevista} />
        <Badge variant={ESTADO_ASIGNACION_BADGE[estadoAsignacion]}>
          {estadoAsignacion}
        </Badge>
      </div>

    </div>
  );
}