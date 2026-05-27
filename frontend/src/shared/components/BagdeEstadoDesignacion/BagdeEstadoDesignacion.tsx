import Badge from "@/components/Badge";
import { ESTADO_DESIGNACION_CONFIG } from "@/shared/utils/bagdeConfig";
import type { EstadoDesignacion } from "@/shared/utils/types/enums";

type Props = {
	value: EstadoDesignacion;
};

export default function BadgeEstadoDesignacion({ value }: Props) {
	const { label, variant } = ESTADO_DESIGNACION_CONFIG[value];

	return <Badge variant={variant}>{label}</Badge>;
}
