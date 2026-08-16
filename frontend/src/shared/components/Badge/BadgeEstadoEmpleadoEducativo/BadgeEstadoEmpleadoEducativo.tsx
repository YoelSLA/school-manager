import Badge from "../Badge";
import {
  ESTADO_EMPLEADO_CONFIG,
  getEstadoEmpleadoKey,
} from "./BadgeEstadoEmpleadoEducativo.config";

type Props = {
  activo: boolean;
};

export default function BadgeEstadoEmpleadoEducativo({ activo }: Props) {
  const key = getEstadoEmpleadoKey(activo);
  const { label, variant } = ESTADO_EMPLEADO_CONFIG[key];

  return <Badge variant={variant}>{label}</Badge>;
}
