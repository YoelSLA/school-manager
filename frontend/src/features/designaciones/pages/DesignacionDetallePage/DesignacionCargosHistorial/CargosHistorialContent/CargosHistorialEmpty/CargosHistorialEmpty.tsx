import type { FiltroCargos } from "@/features/asignaciones/types/asignacion.types";
import styles from "./CargosHistorialEmpty.module.scss";

const MENSAJES: Record<FiltroCargos, string> = {
  LICENCIA: "No hay cargos por licencia",
  PENDIENTE: "No hay cargos pendientes",
  FINALIZADA: "No hay cargos finalizados",
  BAJA: "No hay cargos dados de baja",
};

type Props = {
  filtro: FiltroCargos;
};

export default function CargosHistorialEmpty({ filtro }: Props) {
  return (
    <p className={styles.empty}>
      {MENSAJES[filtro]}
    </p>
  );
}
