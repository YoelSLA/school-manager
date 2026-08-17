import type { EstadoLicencia } from "../../../types";
import Badge from "../Badge";
import { ESTADO_LICENCIA_CONFIG } from "./BadgeEstadoLicencia.config";

type Props = {
	value: EstadoLicencia;
};

export default function BadgeEstadoLicencia({ value }: Props) {
	const { label, variant } = ESTADO_LICENCIA_CONFIG[value];

	return <Badge variant={variant}>{label}</Badge>;
}
