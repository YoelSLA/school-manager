import type { EstadoAsignacion } from "../../../types";
import Badge from "../Badge";
import { ESTADO_ASIGNACION_CONFIG } from "./BadgeEstadoAsignacion.config";

type Props = {
	value: EstadoAsignacion;
};

export default function BadgeEstadoAsignacion({ value }: Props) {
	const { label, variant } = ESTADO_ASIGNACION_CONFIG[value];

	return <Badge variant={variant}>{label}</Badge>;
}
