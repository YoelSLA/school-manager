import type { ReactNode } from "react";
import styles from "./Button.module.scss";

export type ButtonVariant =
	| "primary"
	| "secondary"
	| "filter"
	| "success"
	| "danger";

export type ButtonSize = "sm" | "md";

type Props = {
	children: ReactNode;
	onClick?: () => void;
	variant?: ButtonVariant;
	size?: ButtonSize;
	disabled?: boolean;
	className?: string;
	type?: "button" | "submit" | "reset";
	active?: boolean;
	loading?: boolean;
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
	loading = false,
}: Props) {
	const classes = [
		styles.btn,
		styles[`btn${variant[0].toUpperCase()}${variant.slice(1)}`],
		size === "sm" && styles.btnSm,
		size === "md" && styles.btnMd,
		active && styles.isActive,
		loading && styles.isLoading,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<button
			type={type}
			className={classes}
			onClick={onClick}
			disabled={disabled || loading}
		>
			{/* Spinner */}
			{loading && <span className={styles.spinner} />}

			{/* Contenido (no salta layout) */}
			<span className={styles.content}>
				{children}
			</span>
		</button>
	);
}
