import Button from "@/components/Button";
import styles from "./ConfirmModal.module.scss";

type Props = {
	open: boolean;
	title?: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel: () => void;
	loading?: boolean;
};

export default function ConfirmModal({
	open,
	title = "¿Estás seguro?",
	description = "Esta acción no se puede deshacer.",
	confirmText = "Confirmar",
	cancelText = "Cancelar",
	onConfirm,
	onCancel,
	loading = false,
}: Props) {
	if (!open) return null;

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<header className={styles.header}>
					<h2>{title}</h2>
				</header>

				<p className={styles.description}>{description}</p>

				<footer className={styles.actions}>
					<Button variant="secondary" onClick={onCancel} disabled={loading}>
						{cancelText}
					</Button>

					<Button variant="danger" onClick={onConfirm} disabled={loading}>
						{confirmText}
					</Button>
				</footer>
			</div>
		</div>
	);
}
