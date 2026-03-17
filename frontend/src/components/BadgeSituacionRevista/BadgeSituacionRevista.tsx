import Badge from "@/components/Badge";
import { SITUACION_REVISTA_CONFIG } from "@/utils/bagdeConfig";
import type { SituacionDeRevista } from "@/utils/types/enums";

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