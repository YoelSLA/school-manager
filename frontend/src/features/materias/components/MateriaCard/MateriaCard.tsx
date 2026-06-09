import { Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/Card";
import type { MateriaDetalleDTO } from "@/shared/types";
import styles from "./MateriaCard.module.scss";

type Props = {
	materia: MateriaDetalleDTO;
	onEdit?: () => void;
	onDelete?: () => void;
};

export default function MateriaCard({ materia, onEdit, onDelete }: Props) {
	return (
		<Card className={styles.card} padding="md" elevated largeRadius>
			<div className={styles.layout}>
				{/* MATERIA */}
				<header className={styles.header}>
					<h3 className={styles.title}>{materia.nombre}</h3>
				</header>

				{/* ABREVIATURA */}
				<div className={styles.sectionAbreviatura}>
					<span className={styles.abreviatura}>{materia.abreviatura}</span>
				</div>

				{/* MODULOS */}
				<div className={styles.sectionModulos}>
					{materia.cantidadModulos} módulos
				</div>

				{/* FOOTER */}
				<footer className={styles.footer}>
					<div /> {/* spacer */}
					<div className={styles.actions}>
						<button
							type="button"
							className={`${styles.iconButton} ${styles["iconButton--edit"]}`}
							onClick={onEdit}
						>
							<Edit size={18} />
						</button>

						<button
							type="button"
							className={`${styles.iconButton} ${styles["iconButton--danger"]}`}
							onClick={onDelete}
						>
							<Trash2 size={18} />
						</button>
					</div>
				</footer>
			</div>
		</Card>
	);
}
