import { Pencil, Trash2 } from "lucide-react";
import Button from "@/components/Button";
import styles from "./DesignacionDetalleActions.module.scss";

type Props = {
	onEditar: () => void;
	onEliminar: () => void;
};

export default function DesignacionDetalleActions({
	onEditar,
	onEliminar,
}: Props) {
	return (
		<>
			<h3 className={styles.title}>Acciones</h3>

			<div className={styles.botones}>
				<Button variant="secondary" size="sm" onClick={onEditar}>
					<Pencil size={16} />
					Editar
				</Button>

				<Button variant="danger" size="sm" onClick={onEliminar}>
					<Trash2 size={16} />
					Eliminar
				</Button>
			</div>
		</>
	);
}
