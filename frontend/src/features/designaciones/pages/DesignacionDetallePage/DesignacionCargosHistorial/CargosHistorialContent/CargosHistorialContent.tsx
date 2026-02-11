import type { AsignacionDetalleDTO, FiltroCargos } from "@/features/asignaciones/types/asignacion.types";
import styles from "./CargosHistorialContent.module.scss";
import CargosHistorialEmpty from "./CargosHistorialEmpty";
import { CargosList } from "./CargosList/CargosList";

type Props = {
  cargos: AsignacionDetalleDTO[];
  isLoading: boolean;
  filtro: FiltroCargos;
};

export default function CargosHistorialContent({
  cargos,
  isLoading,
  filtro,
}: Props) {
  if (isLoading) {
    return <p className={styles.loading}>Cargando cargos…</p>;
  }

  if (cargos.length === 0) {
    return <CargosHistorialEmpty filtro={filtro} />;
  }

  return <CargosList cargos={cargos} />;
}
