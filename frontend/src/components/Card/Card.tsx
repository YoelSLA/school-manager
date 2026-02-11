import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import styles from "./Card.module.scss";

export type CardStatus = "success" | "warning" | "danger" | "info";

type Props = {
	children: ReactNode;
	className?: string;

	/* Variantes visuales */
	status?: CardStatus;
	muted?: boolean;
	elevated?: boolean;
	padded?: boolean;
	clickable?: boolean;
	largeRadius?: boolean;

	/* Interacción */
	onClick?: () => void;

	/* Extras */
	viewTransitionName?: string;
};

export default function Card({
	children,
	className,
	status,
	muted = false,
	elevated = false,
	padded = false,
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

		/* status (borde izquierdo) */
		status && styles[`card--${status}`],

		/* variants */
		muted && styles["card--muted"],
		elevated && styles["card--elevated"],
		padded && styles["card--with-padding"],
		clickable && styles["card--clickable"],
		largeRadius && styles["card--large"],

		/* clases externas */
		className,
	]
		.filter(Boolean)
		.join(" ");

	/* 👇 handlers SOLO si es clickable */
	const handleClick = () => {
		if (clickable && onClick) {
			onClick();
		}
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
			{children}
		</article>
	);
}
