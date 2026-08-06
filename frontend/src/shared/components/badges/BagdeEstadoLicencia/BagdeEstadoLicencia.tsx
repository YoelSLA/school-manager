import Badge from "@/shared/components/Badge";
import type { EstadoLicencia } from "@/shared/types/enums";
import { ESTADO_LICENCIA_CONFIG } from "./BagdeEstadoLicencia.config";

type Props = {
  value: EstadoLicencia;
};

export default function BadgeEstadoLicencia({ value }: Props) {
  const { label, variant } = ESTADO_LICENCIA_CONFIG[value];

  return <Badge variant={variant}>{label}</Badge>;
}
