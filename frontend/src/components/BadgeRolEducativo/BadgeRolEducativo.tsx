import Badge from "@/components/Badge";
import { ROL_EDUCATIVO_CONFIG } from "@/utils/bagdeConfig";
import type { RolEducativo } from "@/utils/types/enums";

type Props = {
	value: RolEducativo;
};

export default function BadgeRolEducativo({ value }: Props) {
	const { label, variant, icon } = ROL_EDUCATIVO_CONFIG[value];

	return (
		<Badge variant={variant} icon={icon}>
			{label}
		</Badge>
	);
}
