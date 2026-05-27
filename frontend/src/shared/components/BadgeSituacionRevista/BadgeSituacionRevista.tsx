import Badge from "@/components/Badge";
import { SITUACION_REVISTA_CONFIG } from "@/shared/utils/bagdeConfig";
import type { SituacionDeRevista } from "@/shared/utils/types/enums";

type Props = {
	value: SituacionDeRevista;
};

export default function BadgeSituacionRevista({ value }: Props) {
	const { label, variant, icon } = SITUACION_REVISTA_CONFIG[value];

	return (
		<Badge variant={variant} icon={icon}>
			{label}
		</Badge>
	);
}
