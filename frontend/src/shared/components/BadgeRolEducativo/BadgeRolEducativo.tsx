import Badge from "@/components/Badge";
import { ROL_EDUCATIVO_CONFIG } from "@/shared/utils/bagdeConfig";
import type { RolEducativo } from "@/shared/utils/types/enums";

type Props = {
	rolEducativo: RolEducativo;
};

export default function BadgeRolEducativo({ rolEducativo }: Props) {
	console.log(rolEducativo);
	console.log(ROL_EDUCATIVO_CONFIG);

	const { label, variant, icon } = ROL_EDUCATIVO_CONFIG[rolEducativo];

	return (
		<Badge variant={variant} icon={icon}>
			{label}
		</Badge>
	);
}
