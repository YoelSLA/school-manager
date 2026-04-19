import Badge from "@/components/Badge";
import { ESTADO_ASIGNACION_CONFIG } from "@/utils/bagdeConfig";
import type { EstadoAsignacion } from "@/utils/types/enums";

type Props = {
	value: EstadoAsignacion;
};

export default function BadgeEstadoAsignacion({ value }: Props) {
	const { label, variant } = ESTADO_ASIGNACION_CONFIG[value];

	return <Badge variant={variant}>{label}</Badge>;
}
