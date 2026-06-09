import Badge from "@/components/Badge";
import type { EstadoDesignacion } from "@/shared/types/enums";
import { ESTADO_DESIGNACION_CONFIG } from "@/shared/utils/bagdeConfig";

type Props = {
	value: EstadoDesignacion;
};

export default function BadgeEstadoDesignacion({ value }: Props) {
	const config = ESTADO_DESIGNACION_CONFIG[value];
	return <Badge variant={config.variant}>{config.label}</Badge>;
}
