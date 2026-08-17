import type { EstadoDesignacion } from "../../../types";
import Badge from "../Badge";
import { ESTADO_DESIGNACION_CONFIG } from "./BadgeEstadoDesignacion.config";

type Props = {
	value: EstadoDesignacion;
};

export default function BadgeEstadoDesignacion({ value }: Props) {
	const config = ESTADO_DESIGNACION_CONFIG[value];
	return <Badge variant={config.variant}>{config.label}</Badge>;
}
