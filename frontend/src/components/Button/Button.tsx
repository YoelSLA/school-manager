import styles from "./Button.module.scss";

export type ButtonVariant =
	| "primary"
	| "secondary"
	| "filter"
	| "success"
	| "danger";
export type ButtonSize = "sm" | "md";

type Props = {
	children: React.ReactNode;
	onClick?: () => void;
	variant?: ButtonVariant;
	size?: ButtonSize;
	disabled?: boolean;
	className?: string;
	type?: "button" | "submit" | "reset";
	active?: boolean;
};

export default function Button({
	children,
	onClick,
	variant = "primary",
	size = "md",
	disabled = false,
	className = "",
	type = "button",
	active = false,
}: Props) {
	const classes = [
		styles.btn,
		styles[`btn${variant[0].toUpperCase()}${variant.slice(1)}`],
		size === "sm" && styles.btnSm,
		size === "md" && styles.btnMd,
		active && styles.isActive,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<button
			type={type}
			className={classes}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
