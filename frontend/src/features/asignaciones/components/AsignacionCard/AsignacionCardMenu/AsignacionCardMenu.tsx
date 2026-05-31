import { MoreVertical, Pencil, Trash2, UserMinus } from "lucide-react";
import styles from "./AsignacionCardMenu.module.scss";

type Props = {
	open: boolean;
	onToggle: () => void;
	onEditar: () => void;
	onDarDeBaja: () => void;
	onEliminar: () => void;
};

export default function AsignacionCardMenu({
	open,
	onToggle,
	onEditar,
	onDarDeBaja,
	onEliminar,
}: Props) {
	return (
		<div className={styles.wrapper}>
			<button type="button" className={styles.button} onClick={onToggle}>
				<MoreVertical size={18} />
			</button>

			{open && (
				<div className={styles.menu}>
					<button type="button" onClick={onEditar}>
						<Pencil size={16} />
						Editar
					</button>

					<button type="button" onClick={onDarDeBaja}>
						<UserMinus size={16} />
						Dar de baja
					</button>

					<button type="button" className={styles.danger} onClick={onEliminar}>
						<Trash2 size={16} />
						Eliminar
					</button>
				</div>
			)}
		</div>
	);
}
