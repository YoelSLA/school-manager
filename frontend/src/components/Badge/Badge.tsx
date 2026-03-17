import "./Badge.scss";
import type { BadgeVariant } from "./Badge.types";
import { BADGE_ICONS } from "./Bagde.icons";

type Props = {
	variant: BadgeVariant;
	children: React.ReactNode;
	icon?: React.ElementType;
	showIcon?: boolean;
};

export default function Badge({
	variant,
	children,
	icon: CustomIcon,
	showIcon = true,
}: Props) {
	const DefaultIcon = BADGE_ICONS[variant];
	const Icon = CustomIcon ?? DefaultIcon;

	return (
		<span className={`badge badge--${variant}`}>
			{showIcon && Icon && <Icon className="badge__icon" size={14} />}
			<span className="badge__label">{children}</span>
		</span>
	);
}