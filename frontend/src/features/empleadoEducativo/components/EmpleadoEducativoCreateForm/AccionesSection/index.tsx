import styles from "./AccionesSection.module.scss";

type Props = {
	isSubmitting: boolean;
};

export default function AccionesSection({ isSubmitting }: Props) {
	return (
		<div className={styles.actions}>
			<button
				type="submit"
				className={styles.actions__button}
				disabled={isSubmitting}
			>
				{isSubmitting ? <span className={styles.spinner} /> : "Guardar"}
			</button>
		</div>
	);
}
