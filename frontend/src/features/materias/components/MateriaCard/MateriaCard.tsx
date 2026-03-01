import { Edit, Trash2 } from "lucide-react";
import type { MateriaResponseDTO } from "../../types/materias.types";
import styles from "./MateriaCard.module.scss";

type Props = {
	materia: MateriaResponseDTO;
	onEdit?: () => void;
	onDelete?: () => void;
};

export default function MateriaCard({
	materia,
	onEdit,
	onDelete,
}: Props) {
	return (
		<article className={styles.card}>
			<header className={styles.card__header}>
				<h3 className={styles.card__title}>{materia.nombre}</h3>

				<div className={styles.card__badges}>
					<span className={styles.card__abreviatura}>
						{materia.abreviatura}
					</span>
				</div>
			</header>

			<footer className={styles.card__footer}>
				<span className={styles.card__modulos}>
					{materia.cantidadModulos} módulos
				</span>

				<div className={styles.card__actions}>
					<button
						type="button"
						className={`${styles.card__iconButton} ${styles["card__iconButton--edit"]}`}
						onClick={onEdit}
					>
						<Edit size={18} color="#2563eb" />
					</button>

					<button
						type="button"
						className={`${styles.card__iconButton} ${styles["card__iconButton--danger"]}`}
						onClick={onDelete}
					>
						<Trash2 size={18} color="#dc2626" />
					</button>
				</div>
			</footer>
		</article>
	);
}