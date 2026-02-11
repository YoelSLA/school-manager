import { useNavigate } from "react-router-dom";
import { setEscuelaActiva } from "@/store/escuela/escuelaSlice";
import { useAppDispatch } from "@/store/hooks";
import type { Escuela } from "../../types/escuela.types";
import styles from "./EscuelaCard.module.scss";

type Props = {
	escuela: Escuela;
	onEditar: () => void;
	onEliminar: () => void;
};

export default function EscuelaCard({ escuela, onEditar, onEliminar }: Props) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleEntrar = () => {
		dispatch(setEscuelaActiva(escuela));
		navigate("/dashboard");
	};

	return (
		<div className={styles["escuela-card"]}>
			<div className={styles["escuela-card__header"]}>
				<h3 className={styles["escuela-card__title"]}>{escuela.nombre}</h3>
			</div>

			<div className={styles["escuela-card__body"]}>
				<p>
					📍 <strong>Dirección:</strong>
					<br />
					{escuela.direccion ?? "No informado"}
				</p>

				<p>
					📞 <strong>Teléfono:</strong>
					<br />
					{escuela.telefono ?? "No informado"}
				</p>
			</div>

			<div className={styles["escuela-card__footer"]}>
				<button
					type="button"
					className={styles["escuela-card__enter"]}
					onClick={handleEntrar}
				>
					Entrar
				</button>

				<div className={styles["escuela-card__actions"]}>
					<button
						type="button"
						className={styles["escuela-card__icon-btn"]}
						onClick={onEditar}
						aria-label="Editar escuela"
					>
						✏️
					</button>

					<button
						type="button"
						className={`${styles["escuela-card__icon-btn"]} ${styles["escuela-card__icon-btn--danger"]}`}
						onClick={onEliminar}
						aria-label="Eliminar escuela"
					>
						🗑️
					</button>
				</div>
			</div>
		</div>
	);
}
