import { AlertTriangle } from "lucide-react";
import styles from "./ErrorModal.module.scss";

type Props = {
	error: {
		title: string;
		message: string;
	};
	onClose: () => void;
};

export default function ErrorModal({ error, onClose }: Props) {
	return (
		<div
			className={styles["error-modal__backdrop"]}
			role="dialog"
			aria-modal="true"
		>
			<div className={styles["error-modal"]}>
				<header className={styles["error-modal__header"]}>
					<AlertTriangle size={18} />
					<h4 className={styles["error-modal__title"]}>
						{error.title}
					</h4>
				</header>

				<p className={styles["error-modal__message"]}>
					{error.message}
				</p>

				<footer className={styles["error-modal__footer"]}>
					<button
						type="button"
						className={styles["error-modal__button"]}
						onClick={onClose}
					>
						Entendido
					</button>
				</footer>
			</div>
		</div>
	);
}
