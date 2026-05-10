import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { type ReactNode, useEffect } from "react";

import Button from "@/components/Button";
import styles from "./Modal.module.scss";

type Props = {
	children: ReactNode;
	title?: string;
	size?: "small" | "medium" | "large";
	variant?: "default" | "success" | "error";
	onCancel: () => void;
	confirmLabel?: string;
	isSubmitting?: boolean;
	showConfirm?: boolean;
	showCancel?: boolean;
};

export default function Modal({
	children,
	title,
	size = "medium",
	variant = "default",
	onCancel,
	confirmLabel = "Guardar",
	isSubmitting = false,
	showConfirm = true,
	showCancel = true,
}: Props) {
	const Icon =
		variant === "success"
			? CheckCircle2
			: variant === "error"
				? AlertTriangle
				: null;

	// ✅ Cerrar con ESC
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onCancel();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onCancel]);

	return (
		<div className={styles.modalBackdrop} onClick={onCancel} aria-hidden="true">
			<div
				className={`${styles.modal} ${styles[size]} ${styles[variant]}`}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-labelledby={title ? "modal-title" : undefined}
				tabIndex={-1}
			>
				{title && (
					<header className={styles.modalHeader}>
						<div className={styles.headerLeft}>
							{Icon && (
								<div className={styles.headerIcon}>
									<Icon size={20} />
								</div>
							)}
							<h2 id="modal-title" className={styles.modalTitle}>
								{title}
							</h2>
						</div>
					</header>
				)}

				<div className={styles.modalContent}>{children}</div>

				<footer className={styles.modalFooter}>
					{showCancel && (
						<Button
							type="button"
							variant="ghost"
							onClick={onCancel}
							disabled={isSubmitting}
						>
							Cancelar
						</Button>
					)}

					{showConfirm && (
						<Button type="submit" variant="primary" loading={isSubmitting}>
							{confirmLabel}
						</Button>
					)}
				</footer>
			</div>
		</div>
	);
}
