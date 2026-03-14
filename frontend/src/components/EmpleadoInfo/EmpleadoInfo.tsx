import { User, IdCard } from "lucide-react";
import styles from "./EmpleadoInfo.module.scss";
import { EmpleadoEducativoMinimoDTO } from "@/features/empleadosEducativos/types/empleadosEducativos.types";

type Props = {
  empleado?: EmpleadoEducativoMinimoDTO | null;
};

export default function EmpleadoInfo({ empleado }: Props) {
  return (
    <div className={styles.info} >
      <div className={styles.line}>
        <User size={14} />
        < span className={styles.nombre} >
          {
            empleado
              ? `${empleado.apellido}, ${empleado.nombre}`
              : "Cargo vacante"
          }
        </span>
      </div>

      < div className={styles.line} >
        <IdCard size={14} />
        < span className={styles.cuil} >
          {empleado ? empleado.cuil : "—"}
        </span>
      </div>
    </div>
  );
}