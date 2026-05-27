import { useDeleteAsignacion } from "@/features/asignaciones/hooks/useDeleteAsignacion";
import BadgeSituacionRevista from "@/shared/components/BadgeSituacionRevista/BadgeSituacionRevista";
import BadgeEstadoAsignacion from "@/shared/components/BagdeEstadoAsignacion";
import { formatearFecha } from "@/shared/utils";
import type { AsignacionDetalleDTO } from "@/shared/utils/types";
import { MoreVertical, Pencil, Trash2, User, UserMinus } from "lucide-react";
import { useState } from "react";
import styles from "./CargoCard.module.scss";

type Props = {
	cargo: AsignacionDetalleDTO;
	designacionId: number;
	onEditar?: (cargo: AsignacionDetalleDTO) => void;
};

export default function CargoCard({ cargo, designacionId, onEditar }: Props) {
	const [open, setOpen] = useState(false);

	const eliminarAsignacion = useDeleteAsignacion({
		designacionId,
		onSuccess: () => { },
	});

	const { empleado, periodo, situacionDeRevista, estadoAsignacion, secuencia } =
		cargo;

	const esSuplente = situacionDeRevista === "Suplente";

	const handle = (cb?: () => void) => {
		setOpen(false);
		cb?.();
	};

	return (
		<div className={styles.card}>
			{/* MENU */}
			{!esSuplente && (
				<div className={styles.menuWrapper}>
					<button
						type="button"
						className={styles.menuButton}
						onClick={() => setOpen((prev) => !prev)}
					>
						<MoreVertical size={18} />
					</button>

					{open && (
						<div className={styles.menu}>
							<button
								type="button"
								onClick={() => handle(() => onEditar?.(cargo))}
							>
								<Pencil size={16} />
								Editar
							</button>

							<button type="button" onClick={() => handle()}>
								<UserMinus size={16} />
								Dar de baja
							</button>

							<button
								type="button"
								className={styles.danger}
								onClick={() =>
									handle(() => eliminarAsignacion.mutate(cargo.id))
								}
							>
								<Trash2 size={16} />
								Eliminar
							</button>
						</div>
					)}
				</div>
			)}

			{/* EMPLEADO */}
			<div className={styles.row}>
				<User size={16} />
				<div>
					<div className={styles.name}>
						{empleado.apellido}, {empleado.nombre}
					</div>
					<div className={styles.subtle}>{empleado.cuil}</div>
				</div>
			</div>

			{/* SECUENCIA */}
			{secuencia != null && (
				<div className={styles.periodItem}>
					<span className={styles.periodLabel}> Número de Secuencia</span>
					<span className={styles.periodValue}>{secuencia}</span>
				</div>
			)}
			{/* PERIODO */}
			<div className={styles.period}>
				<div className={styles.periodItem}>
					<span className={styles.periodLabel}>Toma de posesión</span>
					<span className={styles.periodValue}>
						{formatearFecha(periodo.fechaDesde)}
					</span>
				</div>

				{periodo.fechaHasta && (
					<div className={styles.periodItem}>
						<span className={styles.periodLabel}>Cese</span>
						<span className={styles.periodValue}>
							{formatearFecha(periodo.fechaHasta)}
						</span>
					</div>
				)}
			</div>

			{/* BADGES */}
			<div className={styles.badges}>
				<BadgeSituacionRevista value={situacionDeRevista} />
				<BadgeEstadoAsignacion value={estadoAsignacion} />
			</div>
		</div>
	);
}
