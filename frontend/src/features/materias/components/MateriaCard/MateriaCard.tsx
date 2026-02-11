import type { MateriaResponseDTO } from "../../types/materias.types";
import styles from "./MateriaCard.module.scss";

type Props = {
	materia: MateriaResponseDTO;
};

export default function MateriaCard({ materia }: Props) {
	return (
		<article className={styles.card}>
			<header className={styles.card__header}>
				<h3 className={styles.card__title}>{materia.nombre}</h3>
				<span className={styles.card__abreviatura}>{materia.abreviatura}</span>
			</header>

			<div className={styles.card__body}>
				<span className={styles.card__modulos}>{materia.modulos} módulos</span>
			</div>
		</article>
	);
}
