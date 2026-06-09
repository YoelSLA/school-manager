import Badge from "@/components/Badge";
import type { SituacionDeRevista } from "@/shared/types/enums";
import { SITUACION_REVISTA_CONFIG } from "@/shared/utils/bagdeConfig";

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
