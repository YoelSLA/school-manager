import type { ReactNode, MouseEvent } from "react";
import styles from "./Button.module.scss";

export type ButtonVariant =
	| "primary"
	| "secondary"
	| "filter"
	| "success"
	| "danger"
	| "ghost"; // ✅ agregado

export type ButtonSize = "sm" | "md";

type Props = {
	children: ReactNode;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
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
	const isDisabled = disabled || loading;

	const classes = [
		styles.btn,
		styles[`btn${variant.charAt(0).toUpperCase()}${variant.slice(1)}`],
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
			onClick={isDisabled ? undefined : onClick}
			disabled={isDisabled}
			aria-disabled={isDisabled}
			aria-busy={loading}
		>
			{loading && <span className={styles.spinner} />}

			<span className={styles.content}>
				{children}
			</span>
		</button>
	);
}