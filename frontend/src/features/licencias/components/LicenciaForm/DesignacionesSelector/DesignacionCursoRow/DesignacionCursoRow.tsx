import {
	BookOpen,
	CalendarDays,
	GraduationCap,
	Hash,
	User,
} from "lucide-react";
import { useCargoActivo } from "@/features/asignaciones/hooks/useCargoActivo";
import BadgeSituacionRevista from "@/shared/components/BadgeSituacionRevista";
import type { DesignacionLicenciaCursoDTO } from "@/shared/types";
import { TURNO_LABELS } from "@/shared/utils/enumLabels";
import styles from "./DesignacionCursoRow.module.scss";

type Props = {
	designacion: DesignacionLicenciaCursoDTO;
	checked: boolean;
	onToggle: (id: number) => void;
};

export default function DesignacionCursoRow({
	designacion,
	checked,
	onToggle,
}: Props) {
	const { cargoActivo, isLoading } = useCargoActivo(designacion.id);

	return (
		<label className={styles.item}>
			<input
				type="checkbox"
				checked={checked}
				onChange={() => onToggle(designacion.id)}
			/>

			<div className={styles.content}>
				<div className={styles.top}>
					<span className={styles.cupof}>
						<Hash size={15} />
						{designacion.cupof}
					</span>

					<span className={styles.rol}>
						<User size={15} />
						{designacion.rolEducativo}
					</span>
				</div>

				<div className={styles.bottom}>
					<span className={styles.materia}>
						<BookOpen size={15} />
						{designacion.materia.nombre}
					</span>

					<span className={styles.curso}>
						<GraduationCap size={15} />
						{designacion.curso.division} —{" "}
						{TURNO_LABELS[designacion.curso.turno]}
					</span>
				</div>

				{isLoading ? (
					<div className={styles.loading}>Cargando cargo...</div>
				) : cargoActivo ? (
					<div className={styles.meta}>
						<div className={styles.tipo}>
							<BadgeSituacionRevista value={cargoActivo.situacionDeRevista} />
						</div>

						<span className={styles.dot}>•</span>

						<span className={styles.fecha}>
							<CalendarDays size={14} />

							{cargoActivo.periodo.tipo === "CERRADO" ? (
								<>
									{cargoActivo.periodo.fechaDesde}
									{" → "}
									{cargoActivo.periodo.fechaHasta}
								</>
							) : (
								<>Desde {cargoActivo.periodo.fechaDesde}</>
							)}
						</span>
					</div>
				) : (
					<div className={styles.empty}>Sin cargo activo</div>
				)}
			</div>
		</label>
	);
}
