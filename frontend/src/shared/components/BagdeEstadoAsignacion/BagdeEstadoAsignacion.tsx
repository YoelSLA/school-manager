import Badge from "@/components/Badge";
import type { EstadoAsignacion } from "@/shared/types/enums";
import { ESTADO_ASIGNACION_CONFIG } from "@/shared/utils/bagdeConfig";

type Props = {
	value: EstadoAsignacion;
};

export default function BadgeEstadoAsignacion({ value }: Props) {
	const { label, variant } = ESTADO_ASIGNACION_CONFIG[value];

	return <Badge variant={variant}>{label}</Badge>;
}
