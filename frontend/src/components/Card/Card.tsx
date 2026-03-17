import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import styles from "./Card.module.scss";

export type CardStatus = "success" | "warning" | "danger" | "info";
export type CardPadding = "sm" | "md" | "lg";

type Props = {
	children: ReactNode;
	className?: string;

	status?: CardStatus;
	padding?: CardPadding;

	muted?: boolean;
	elevated?: boolean;
	clickable?: boolean;
	largeRadius?: boolean;

	onClick?: () => void;
	viewTransitionName?: string;
};

export default function Card({
	children,
	className,
	status,
	padding = "md",
	muted = false,
	elevated = false,
	clickable = false,
	largeRadius = false,
	onClick,
	viewTransitionName,
}: Props) {
	const style: CSSProperties | undefined = viewTransitionName
		? { viewTransitionName }
		: undefined;

	const cardClassName = [
		styles.card,
		status && styles[`card--${status}`],
		padding && styles[`card--padding-${padding}`],
		muted && styles["card--muted"],
		elevated && styles["card--elevated"],
		clickable && styles["card--clickable"],
		largeRadius && styles["card--large"],
		className,
	]
		.filter(Boolean)
		.join(" ");

	const handleClick = () => {
		if (clickable && onClick) onClick();
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
		if (!clickable || !onClick) return;

		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick();
		}
	};

	return (
		<article
			className={cardClassName}
			style={style}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			role={clickable ? "button" : undefined}
			tabIndex={clickable ? 0 : undefined}
		>
			<div className={styles.card__inner}>{children}</div>
		</article>
	);
}