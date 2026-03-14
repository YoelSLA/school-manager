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
	showConfirm?: boolean;
};

export default function Modal({
	children,
	title,
	size = "medium",
	onCancel,
	confirmLabel = "Guardar",
	isSubmitting = false,
	showConfirm = true,
}: Props) {
	return (
		<div
			className={styles.modalBackdrop}
			onClick={onCancel}
		>
			<div
				className={`${styles.modal} ${styles[size]}`}
				onClick={(e) => e.stopPropagation()}
			>
				{title && (
					<header className={styles.modalHeader}>
						<h2 className={styles.modalTitle}>{title}</h2>
					</header>
				)}

				<div className={styles.modalContent}>
					{children}
				</div>

				<footer className={styles.modalFooter}>
					<Button
						type="button"
						variant="ghost"
						onClick={onCancel}
						disabled={isSubmitting}
					>
						Cancelar
					</Button>

					{showConfirm && (
						<Button
							type="submit"
							variant="primary"
							loading={isSubmitting}
						>
							{confirmLabel}
						</Button>
					)}
				</footer>
			</div>
		</div>
	);
}