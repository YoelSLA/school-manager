import { useNavigate } from "react-router-dom";
import { setEscuelaActiva } from "@/store/escuela/escuelaSlice";
import { useAppDispatch } from "@/store/hooks";

import Card from "@/components/Card/Card";

import { Pencil, Trash2, MapPin, Phone } from "lucide-react";

import styles from "./EscuelaCard.module.scss";
import { EscuelaResponseDTO } from "@/utils/types";

type Props = {
	escuela: EscuelaResponseDTO;
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
		<Card
			elevated
			clickable
			onClick={handleEntrar}
			className={styles.escuelaCard}
		>
			<div className={styles.escuelaCardHeader}>
				<h3 className={styles.escuelaCardTitle}>{escuela.nombre}</h3>
			</div>

			<div className={styles.escuelaCardBody}>
				<p className={styles.escuelaCardInfo}>
					<MapPin size={16} />
					<span>
						<strong>Localidad:</strong>{" "}
						{escuela.localidad ?? "No informado"}
					</span>
				</p>

				<p className={styles.escuelaCardInfo}>
					<MapPin size={16} />
					<span>
						<strong>Dirección:</strong>{" "}
						{escuela.direccion ?? "No informado"}
					</span>
				</p>

				<p className={styles.escuelaCardInfo}>
					<Phone size={16} />
					<span>
						<strong>Teléfono:</strong>{" "}
						{escuela.telefono ?? "No informado"}
					</span>
				</p>
			</div>

			<div className={styles.escuelaCardFooter}>
				<div className={styles.escuelaCardActions}>
					<button
						type="button"
						className={styles.escuelaCardIconBtn}
						onClick={(e) => {
							e.stopPropagation();
							onEditar();
						}}
						aria-label="Editar escuela"
					>
						<Pencil size={16} />
					</button>

					<button
						type="button"
						className={`${styles.escuelaCardIconBtn} ${styles.escuelaCardIconBtnDanger}`}
						onClick={(e) => {
							e.stopPropagation();
							onEliminar();
						}}
						aria-label="Eliminar escuela"
					>
						<Trash2 size={16} />
					</button>
				</div>
			</div>
		</Card>
	);
}