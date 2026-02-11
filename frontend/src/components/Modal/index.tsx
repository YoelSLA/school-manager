import type { ReactNode } from "react";
import styles from "./Modal.module.scss";

type Props = {
	children: ReactNode;
	title?: string;
	size?: "small" | "medium" | "large";

	onCancel: () => void;
	onConfirm: () => void;
	confirmLabel?: string;
	isSubmitting?: boolean;
};

export default function Modal({
	children,
	title,
	size = "medium",
	onCancel,
	onConfirm,
	confirmLabel = "Guardar",
	isSubmitting = false,
}: Props) {
	return (
		<div className={styles["modal-backdrop"]}>
			<div className={`${styles.modal} ${styles[size]}`}>
				{title && (
					<header className={styles.modal__header}>
						<h2 className={styles.modal__title}>{title}</h2>
					</header>
				)}

				<div className={styles.modal__content}>{children}</div>

				<footer className={styles.modal__footer}>
					<button
						type="button"
						className={`${styles.btn} ${styles["btn--ghost"]}`}
						onClick={onCancel}
						disabled={isSubmitting}
					>
						Cancelar
					</button>

					<button
						type="button"
						className={`${styles.btn} ${styles["btn--primary"]}`}
						onClick={onConfirm}
						disabled={isSubmitting}
					>
						{confirmLabel}
					</button>
				</footer>
			</div>
		</div>
	);
}
