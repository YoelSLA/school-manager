import type { ReactNode } from "react";
import styles from "./Modal.module.scss";
import Button from "@/components/Button";

type Props = {
	children: ReactNode;
	title?: string;
	size?: "small" | "medium" | "large";
	onCancel: () => void;
	confirmLabel?: string;
	isSubmitting?: boolean;
};

export default function Modal({
	children,
	title,
	size = "medium",
	onCancel,
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

				<div className={styles.modal__content}>
					{children}
				</div>

				<footer className={styles.modal__footer}>
					<Button
						type="button"
						variant="ghost"
						onClick={onCancel}
						disabled={isSubmitting}
					>
						Cancelar
					</Button>

					<Button
						type="submit"
						variant="primary"
						loading={isSubmitting}
					>
						{confirmLabel}
					</Button>
				</footer>
			</div>
		</div>
	);
}