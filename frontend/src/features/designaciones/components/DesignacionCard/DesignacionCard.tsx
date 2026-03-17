import { Card } from "@/components/Card";
import { useCargoActivo } from "@/features/asignaciones/hooks/useCargoActivo";
import styles from "./DesignacionCard.module.scss";
import type { EstadoDesignacion } from "@/utils/types/enums";
import { Clock, Tag, } from "lucide-react";
import EmpleadoInfo from "@/components/EmpleadoInfo";
import BadgeEstadoDesignacion from "@/components/BagdeEstadoDesignacion";
import BadgeSituacionRevista from "@/components/BadgeSituacionRevista/BadgeSituacionRevista";

type Props = {
	designacionId: number;
	franjasCount: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	onVerDetalle: () => void;
	children: React.ReactNode;
};

export default function DesignacionCard({
	designacionId,
	franjasCount,
	cupof,
	estadoDesignacion,
	onVerDetalle,
	children,
}: Props) {
	const { cargoActivo } = useCargoActivo(designacionId);

	const empleado = cargoActivo?.empleado
		? {
			...cargoActivo.empleado,
			situacionDeRevista: cargoActivo.situacionDeRevista,
		}
		: undefined;

	const status = estadoDesignacion === "CUBIERTA" ? "success" : "danger";

	const franjasLabel =
		franjasCount === 1 ? "1 franja" : `${franjasCount} franjas`;

	return (
		<Card clickable status={status} onClick={onVerDetalle}>
			<div className={styles.layout}>
				{/* ================= HEADER ================= */}

				<header className={styles.header}>
					<div className={styles.cupof}>
						<Tag size={18} />
						<span>#{cupof}</span>
					</div>

					<BadgeEstadoDesignacion value={estadoDesignacion} />
				</header>

				{/* ================= EMPLEADO ================= */}

				<div className={styles.sectionEmpleado}>
					<div className={styles.persona}>
						{empleado && (
							<div className={styles.badgeWrapper}>
								<BadgeSituacionRevista
									value={empleado.situacionDeRevista}
								/>
							</div>
						)}

						<EmpleadoInfo empleado={empleado} />
					</div>
				</div>

				{/* ================= CONTENT ================= */}

				<div className={styles.sectionContent}>{children}</div>

				{/* ================= HORARIOS ================= */}

				<div className={styles.sectionHorarios}>
					<div className={styles.horarios}>
						<Clock className={styles.horariosIcon} />

						<span className={styles.horariosText}>
							Carga horaria · {franjasLabel}
						</span>
					</div>
				</div>
			</div>
		</Card>
	);
}