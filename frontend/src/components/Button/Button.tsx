import { useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import styles from "./Button.module.scss";

export type ButtonVariant =
	| "primary"
	| "secondary"
	| "filter"
	| "success"
	| "danger"
	| "ghost";

export type ButtonSize = "sm" | "md" | "icon";

type DropdownItem = {
	label: string;
	onClick: () => void;
};

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

	// 👇 NUEVO
	dropdownItems?: DropdownItem[];
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
	dropdownItems,
}: Props) {
	const [open, setOpen] = useState(false);

	const isDisabled = disabled || loading;

	const classes = [
		styles.btn,
		styles[`btn${variant.charAt(0).toUpperCase()}${variant.slice(1)}`],
		size === "sm" && styles.btnSm,
		size === "md" && styles.btnMd,
		size === "icon" && styles.btnIcon,
		active && styles.isActive,
		loading && styles.isLoading,
		className,
	]
		.filter(Boolean)
		.join(" ");

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		if (dropdownItems) {
			setOpen((prev) => !prev);
		} else {
			onClick?.(e);
		}
	};

	return (
		<div className={styles.wrapper}>
			<button
				type={type}
				className={classes}
				onClick={isDisabled ? undefined : handleClick}
				disabled={isDisabled}
				aria-disabled={isDisabled}
				aria-busy={loading}
			>
				{loading && <span className={styles.spinner} />}
				<span className={styles.content}>
					{children}
					{dropdownItems && " ▾"}
				</span>
			</button>

			{dropdownItems && open && (
				<div className={styles.dropdown}>
					{dropdownItems.map(item => (
						<button
							type="button"
							key={item.label}
							className={styles.dropdownItem}
							onClick={() => {
								item.onClick();
								setOpen(false);
							}}
						>
							{item.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}