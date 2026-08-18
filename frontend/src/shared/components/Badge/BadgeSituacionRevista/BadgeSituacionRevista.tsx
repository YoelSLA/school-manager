import type { SituacionDeRevista } from "../../../types";
import Badge from "../Badge";
import { SITUACION_REVISTA_CONFIG } from "./BadgeSituacionRevista.config";

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
