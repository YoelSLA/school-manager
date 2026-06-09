import { CalendarDays, Hash, User } from "lucide-react";
import { useCargoActivo } from "@/features/asignaciones/hooks/useCargoActivo";
import BadgeSituacionRevista from "@/shared/components/BadgeSituacionRevista";
import type { DesignacionLicenciaAdministrativaDTO } from "@/shared/types";
import { formatearFecha } from "@/shared/utils";
import styles from "./DesignacionAdministrativaRow.module.scss";

type Props = {
	designacion: DesignacionLicenciaAdministrativaDTO;
	checked: boolean;
	onToggle: (id: number) => void;
};

export default function DesignacionAdministrativaRow({
	designacion,
	checked,
	onToggle,
}: Props) {
	const { cargoActivo, isLoading } = useCargoActivo(designacion.id);

	const esTitular = cargoActivo?.situacionDeRevista === "TITULAR";

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

				{isLoading ? (
					<div className={styles.loading}>Cargando cargo...</div>
				) : cargoActivo ? (
					<div className={styles.meta}>
						<span className={styles.tipo}>
							<BadgeSituacionRevista value={cargoActivo.situacionDeRevista} />
						</span>

						<span className={styles.dot}>•</span>

						<span className={styles.fecha}>
							<CalendarDays size={14} />

							{esTitular ? (
								<>Desde {formatearFecha(cargoActivo.periodo.fechaDesde)}</>
							) : (
								<>
									{formatearFecha(cargoActivo.periodo.fechaDesde)}
									{" ➡️ "}
									{formatearFecha(cargoActivo.periodo.fechaDesde)}
								</>
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
