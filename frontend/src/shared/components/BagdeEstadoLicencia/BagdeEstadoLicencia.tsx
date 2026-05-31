import Badge from "@/components/Badge";
import { ESTADO_LICENCIA_CONFIG } from "@/shared/utils/bagdeConfig";
import type { EstadoLicencia } from "@/shared/utils/types/enums";

type Props = {
	value: EstadoLicencia;
};

export default function BadgeEstadoLicencia({ value }: Props) {
	const { label, variant } = ESTADO_LICENCIA_CONFIG[value];

	return <Badge variant={variant}>{label}</Badge>;
}
