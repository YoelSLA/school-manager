import { ArrowRight } from "lucide-react";
import type { CursoResponseDTO } from "@/cursos/types/cursos.types";
import styles from "./CursoCard.module.scss";

type Props = {
	curso: CursoResponseDTO;
	onVerDetalle: (curso: CursoResponseDTO) => void;
};

export default function CursoCard({ curso, onVerDetalle }: Props) {
	return (
		<article className={styles.card}>
			{/* HEADER */}
			<header className={styles.card__header}>
				<h3 className={styles.card__titulo}>{curso.division}</h3>
				<span className={styles.card__turno}>{curso.turno}</span>
			</header>

			{/* BODY */}
			<div className={styles.card__body}></div>

			{/* FOOTER */}
			<footer className={styles.card__footer}>
				<button
					type="button"
					className={styles.card__action}
					onClick={() => onVerDetalle(curso)}
				>
					Ver detalle
					<ArrowRight size={14} />
				</button>
			</footer>
		</article>
	);
}
