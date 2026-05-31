import { Clock, Tag } from "lucide-react";
import { Card } from "@/components/Card";
import { useCargoActivo } from "@/features/asignaciones/hooks/useCargoActivo";
import BadgeSituacionRevista from "@/shared/components/BadgeSituacionRevista/BadgeSituacionRevista";
import BadgeEstadoDesignacion from "@/shared/components/BagdeEstadoDesignacion";
import EmpleadoInfo from "@/shared/components/EmpleadoInfo";
import type { EstadoDesignacion } from "@/shared/utils/types/enums";
import styles from "./DesignacionCard.module.scss";

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

				<header className={styles.sectionHeader}>
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
								<BadgeSituacionRevista value={empleado.situacionDeRevista} />
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
